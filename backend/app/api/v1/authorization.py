from fastapi import Request, APIRouter, Depends
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth

from app.core import settings
from app.auth import create_access_token
from app.database import get_db
from app.domain import User
from app.crud import create_user, get_user

auth_router: APIRouter = APIRouter(prefix="/auth", tags=["Auth"])

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.client_id,
    client_secret=settings.client_secret,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

@auth_router.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@auth_router.get("/callback", name="auth_callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info: dict = await oauth.google.parse_id_token(token, nonce=None)
    user: User | None = get_user(db, user_info["sub"])
    if not user:
        user = create_user(
            db=db,
            user_info=user_info
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}