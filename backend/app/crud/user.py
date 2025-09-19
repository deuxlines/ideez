from sqlalchemy.orm import Session

from app.domain import User

def get_user(db: Session, google_id: str) -> User | None:
    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        return None
    return user

def create_user(db: Session, user_info: dict) -> User:
    user = User()
    user.name = user_info["name"]  if user_info["name"] else "No Name"
    user.google_id = user_info["sub"]
    user.email = user_info["email"]
    user.picture_url = user_info["picture"]

    db.add(user)
    db.commit()
    db.refresh(user)
    return user