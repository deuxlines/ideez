from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user_id
from app.schemas import UpdateUsernameRequest
from app.domain import User
from app.crud import get_current_user, update_user_avatar

user_router: APIRouter = APIRouter(prefix="/user")


@user_router.post("/change-name")
async def change_name(
    req: UpdateUsernameRequest, 
    db: Session = Depends(get_db), 
    user_id: UUID = Depends(get_current_user_id)
):
    if len(req.new_name) > 14:
        raise HTTPException(status_code=400, detail="The new name is too long")
    
    user: User | None = get_current_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if req.new_name.strip() == "" or len(req.new_name.strip()) < 1:
        raise HTTPException(status_code=400, detail="New name is too short.")
    user.name = req.new_name
    db.commit()
    db.refresh(user)

    return {"message": "Name changes successfully"}

@user_router.post("/upload-avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id),
):
    user: User | None = get_current_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_user_avatar(db, user, file.file)

    return {"url": user.picture_url}