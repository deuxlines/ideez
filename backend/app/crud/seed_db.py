from app.database import get_db
from app.domain import User
from . import create_password_user
from app.auth import hash_password

def seed():
    db = next(get_db())

    user = User()
    user.hashed_password = hash_password("adm_pass_so_wut")
    user.name = "Admin"
    user.email = "admin@example.com"
    db.add(user)
    db.commit()

if __name__ == "__main__":
    seed()