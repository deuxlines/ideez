import uuid
from datetime import datetime

from pydantic import BaseModel
from pydantic import EmailStr


class UserBase(BaseModel):
    name: str | None = None
    avatar_url: str | None = None
    

class UserCreate(UserBase):
    email: EmailStr
    google_id: str | None = None
    microsoft_id: str | None = None


class UserResponse(UserBase):
    id: uuid.UUID
    email: EmailStr
    last_login: datetime | None = None
    is_active: bool

    class Config:
        from_attributes = True


class UserUpdate(UserBase):
    pass