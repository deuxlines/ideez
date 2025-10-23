from uuid import UUID
from typing import BinaryIO

from sqlalchemy.orm import Session

from app.domain import User
from app.auth import hash_password
from app.schemas import RegisterRequest
from app.infrastructure.application.cloudinary import upload_image

def get_current_user(db: Session, id: UUID) -> User | None:
    user = db.query(User).filter(User.id == id).first()
    if not user:
        return None
    return user

def get_user_by_email(db: Session, email: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    return user

def get_user_by_google_id(db: Session, google_id: str) -> User | None:
    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        return None
    return user

def create_google_user(db: Session, user_info: dict) -> User:
    user = User()
    user.google_id = user_info["sub"]
    user.name = user_info.get("name", "No Name")
    user.email = user_info["email"]
    user.picture_url=user_info.get("picture", "")

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_password_user(db: Session, req: RegisterRequest) -> User:
    user = User()
    user.hashed_password = hash_password(req.password.strip())
    user.name = req.name.strip()
    user.email = req.email
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user_avatar(db: Session, user: User, file: BinaryIO):
    url = upload_image(file)
    user.picture_url = url
    db.commit()
    db.refresh(user)