from pydantic import EmailStr

from .base import Base


class UserCreate(Base):
    email: EmailStr
    avatar_url: str | None = None
    google_id: str | None = None
    microsoft_id: str | None = None