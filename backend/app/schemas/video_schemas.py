import uuid

from pydantic import BaseModel
from pydantic import EmailStr


class Video(BaseModel):
    video_id: str