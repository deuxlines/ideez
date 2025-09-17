from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from app.database import Base


class Video(Base):
    __tablename__ = "videos"

    video_id: Mapped[str] = mapped_column(String(), unique=True, nullable=False)