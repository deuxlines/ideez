from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
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
async def google_auth(response: Response, data: GoogleToken, db: Session = Depends(get_db)):
    try:
        print("Received token:", data.token)
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

        token = create_access_token(data={"sub": str(user.id)})

        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,
            samesite="lax",
            secure=settings.env_mode != "development",
            path="/"
        )

        return {"user": {"email": user.email, "name": user.name, "picture": user.picture_url}}
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid Google token")
    
@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}