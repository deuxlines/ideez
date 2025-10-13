from uuid import UUID

from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.domain import User
from app.auth import hash_password

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

def create_password_user(db: Session, user_info: dict) -> User:
    user = User()
    user.hashed_password = hash_password(user_info["password"])
    user.name = user_info.get("name", "No Name")
    user.email = user_info["email"]
    
    db.add(user)
    db.commit()
    db.refresh(user)
    return user