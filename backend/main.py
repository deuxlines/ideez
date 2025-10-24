from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app import video_router, auth_router, me_router, user_router, settings, create_app, setup_middleware

app: FastAPI = create_app(
    title = settings.app_name,
    debug = settings.debug,
    use_sessions = True,
    routers = [
        auth_router,
        video_router,
        me_router,
        user_router,
    ]
)

setup_middleware(app)

app.mount("/", StaticFiles(directory="dist", html=True), name="frontend")