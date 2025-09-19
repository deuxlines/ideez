from typing import Any

from fastapi import FastAPI, APIRouter

def create_app(
        *_: tuple[Any],
        routers: list[APIRouter],
        **kwargs: Any,
) -> FastAPI:
    app: FastAPI = FastAPI(**kwargs)
    
    for router in routers:
        app.include_router(router)

    return app