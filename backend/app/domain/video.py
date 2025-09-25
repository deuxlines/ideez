import uuid
from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, UUID, ForeignKey, DateTime, func

from app.database import Base


class Video(Base):
    __tablename__ = "videos"

    video_id: Mapped[str] = mapped_column(String(), unique=True, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )   

    user: Mapped["User"] = relationship(back_populates="videos")