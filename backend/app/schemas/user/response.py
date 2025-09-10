import uuid
from datetime import datetime

from pydantic import EmailStr

from .base import Base


class UserResponse(Base):
    id: uuid.UUID
    email: EmailStr
    name: str
    avatar_url: str | None = None
    last_login: datetime | None = None
    is_active: bool

    class Config:
        from_attributes = True