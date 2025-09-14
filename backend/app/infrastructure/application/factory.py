from typing import Any

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


def create_app(
        *_: tuple[Any],
        routers: list[APIRouter],
        origins: list[str]=["http:localhost:3000"],
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

    for router in routers:
        app.include_router(router=router)

    return app