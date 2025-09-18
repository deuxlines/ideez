from uuid import UUID

from pydantic import BaseModel


class VideoBase(BaseModel):
    video_id: str


class VideoCreate(VideoBase):
    pass


class VideoRead(VideoBase):
    id: UUID
    
    class Config:
        from_attributes = True