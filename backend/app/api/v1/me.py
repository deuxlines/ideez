from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user_id
from app.crud import get_current_user
from app.domain import User

me_router: APIRouter = APIRouter(prefix="/me", tags=["Me"])

@me_router.get("/")
async def me(
    db: Session = Depends(get_db), 
    user_id: UUID = Depends(get_current_user_id)
) -> dict:
    user: User | None = get_current_user(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {
        "user": {
            "email": user.email, 
            "name": user.name, 
            "picture": user.picture_url
        }
    }