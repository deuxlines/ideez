from typing import Annotated

from pydantic import BaseModel, EmailStr, constr


PasswordStr = Annotated[str, constr(strip_whitespace=True, min_length=8)]
NameStr = Annotated[str, constr(strip_whitespace=True, min_length=1)]


class LoginRequest(BaseModel):
    email: EmailStr
    password: PasswordStr


class RegisterRequest(BaseModel):
    name: NameStr
    email: EmailStr
    password: PasswordStr


class GoogleToken(BaseModel):
    token: str