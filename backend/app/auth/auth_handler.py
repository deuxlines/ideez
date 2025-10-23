
from datetime import datetime, timedelta, timezone
from uuid import UUID
from passlib.context import CryptContext

from fastapi.security import HTTPBearer
from fastapi import HTTPException, status, Cookie
from jose import jwt, JWTError, ExpiredSignatureError

from app.core import settings

auth_scheme = HTTPBearer()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
PEPPER = settings.pepper

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7
SECRET_KEY = settings.secret_key

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def get_current_user_id(access_token: str | None = Cookie(None)) -> UUID:
    try:
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated"
            )

        payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
        user_id = UUID(payload.get("sub"))
        if user_id:
            return user_id
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

def hash_password(password: str) -> str:
    return pwd_context.hash(password + PEPPER)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password + PEPPER, hashed)

def set_auth_cookie(response, token) -> None:
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="none",
        secure=True,
        path="/"
    )