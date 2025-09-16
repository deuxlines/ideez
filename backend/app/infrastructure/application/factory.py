from typing import Any

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.core import settings

def create_app(
        *_: tuple[Any],
        routers: list[APIRouter],
        origins: list[str]=["http://localhost:3000"],
        **kwargs: Any,
) -> FastAPI:
    app: FastAPI = FastAPI(**kwargs)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)

    for router in routers:
        app.include_router(router)

    return app