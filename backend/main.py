from fastapi import FastAPI
import uvicorn

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

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)