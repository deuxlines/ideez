from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, func

from datetime import datetime

from app.database import Base

class User(Base):
    __tablename__ = "users"

    google_id: Mapped[str] = mapped_column(String(60), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(), nullable=True)
    picture_url: Mapped[str] = mapped_column(String(1000), nullable=True)
    last_login: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )