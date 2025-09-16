from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt

from app.core import settings
from app.domain import User
from app.core import settings 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

def get_user(db: Session, google_id: str) -> User | None:
    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        return None
    return user

def create_user(db: Session, user_info) -> User:
    user = User()
    user.name = user_info["name"]  if user_info.name else "No Name"
    user.google_id = user_info["sub"]
    user.email = user_info["email"]
    user.picture_url = user_info["picture"]

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)
    return token