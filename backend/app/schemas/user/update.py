from pydantic import BaseModel
from .base import Base

class UserUpdate(Base):
    avatar_url: str | None = None