import uuid

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, UUID, ForeignKey

from app.database import Base


class Video(Base):
    __tablename__ = "videos"

    video_id: Mapped[str] = mapped_column(String(), unique=True, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="videos")