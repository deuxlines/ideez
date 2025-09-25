from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.schemas import GoogleToken
from app.core import settings
from app.auth import create_access_token
from app.database import get_db
from app.domain import User
from app.crud import create_user, get_user

auth_router: APIRouter = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/google")
async def google_auth(data: GoogleToken, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(
            data.token, google_requests.Request(),
            settings.client_id
        )
        # print(idinfo)
        user: User | None = get_user(db, idinfo["sub"])
        if not user:
            user = create_user(
                db=db,
                user_info=idinfo
            )
        return {"access_token": create_access_token(data={"sub": str(user.id)}), "user": {"email": idinfo["email"], "name": idinfo.get("name"), "picture": idinfo["picture"]}}
    except ValueError as e:
        # print(e)
        raise HTTPException(status_code=400, detail="Invalid Google token")