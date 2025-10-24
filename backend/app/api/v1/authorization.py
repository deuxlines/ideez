from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.schemas import GoogleToken, LoginRequest, RegisterRequest
from app.core import settings
from app.auth import create_access_token, set_auth_cookie, verify_password
from app.database import get_db
from app.domain import User
from app.crud import create_google_user, create_password_user, get_user_by_google_id, get_user_by_email

auth_router: APIRouter = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/google")
async def google_auth(response: Response, data: GoogleToken, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(
            data.token, google_requests.Request(),
            settings.client_id
        )

        user: User | None = get_user_by_google_id(db, idinfo["sub"])
        if not user:
            user = create_google_user(
                db=db,
                user_info=idinfo
            )

        token = create_access_token(data={"sub": str(user.id)})

        set_auth_cookie(response, token)

        return {"user": {"email": user.email, "name": user.name, "picture": user.picture_url, "created_at": user.created_at,},}
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid Google token")
    
@auth_router.post("/login")
async def login(response: Response, req: LoginRequest, db: Session = Depends(get_db)):
    user: User | None = get_user_by_email(db, req.email)
    if not user or not verify_password(req.password.strip(), user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": str(user.id)})
    set_auth_cookie(response, token)

    return {"user": {"email": user.email, "name": user.name, "picture": user.picture_url, "created_at": user.created_at,},}

@auth_router.post("/register")
async def register(response: Response, req: RegisterRequest, db: Session = Depends(get_db)):
    user: User | None = get_user_by_email(db, req.email)
    if user:
        raise HTTPException(status_code=400, detail="User already exists") #temporary solution until I figure out how to add email verification :(

    if req.name.strip() == "" or len(req.name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Name required")
    if req.password.strip() == "":
        raise HTTPException(status_code=400, detail="Password Required")
    if req.email.strip() == "":
        raise HTTPException(status_code=400, detail="Email Required")
    if len(req.name.strip()) > 14:
        raise HTTPException(status_code=400, detail="The name is too long")

    user = create_password_user(db, req)
    token = create_access_token(data={"sub": str(user.id)})
    set_auth_cookie(response, token)

    return {"user": {"email": user.email, "name": user.name, "created_at": user.created_at,}}


@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}