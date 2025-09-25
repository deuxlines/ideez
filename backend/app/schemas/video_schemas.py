from uuid import UUID
from datetime import datetime
import re

from pydantic import BaseModel, field_validator

YOUTUBE_REGEX = re.compile(
    r"(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^#&?]{11})"
)


class VideoBase(BaseModel):
    video_id: str


class VideoCreate(VideoBase):
    @field_validator("video_id", mode="before")
    def extract_video_id(cls, v: str) -> str:
        match = YOUTUBE_REGEX.search(v)
        if not match:
            raise ValueError("Invalid YouTube URL")
        return match.group(1)


class VideoRead(VideoBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True