from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user_id

user_router: APIRouter = APIRouter(prefix="/user")


@user_router.post("/change-name")
async def change_name(req, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id))