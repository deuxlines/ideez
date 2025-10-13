import uuid
from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, constr
from pydantic import EmailStr


PasswordStr = Annotated[str, constr(strip_whitespace=True, min_length=8)]
NameStr = Annotated[str, constr(strip_whitespace=True, min_length=1)]


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


class UpdateUsernameRequest(BaseModel):
    name: NameStr

class UpdatePasswordRequest(BaseModel):
    old_password: str
    new_password: PasswordStr