from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.schemas import GoogleToken
from app.core import settings
from app.auth import create_access_token
from app.database import get_db
from app.domain import User
from app.crud import create_user, get_user_by_google_id

auth_router: APIRouter = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/google")
async def google_auth(data: GoogleToken, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(
            data.token, google_requests.Request(),
            settings.client_id
        )
        user: User | None = get_user_by_google_id(db, idinfo["sub"])
        if not user:
            user = create_user(
                db=db,
                user_info=idinfo
            )
        return {"access_token": create_access_token(data={"sub": str(user.id)}), "user": {"email": user.email, "name": user.name, "picture": user.picture_url}}
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid Google token")