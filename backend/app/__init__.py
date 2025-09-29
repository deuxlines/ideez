from .core import settings
from .api.v1 import auth_router, video_router, me_router
from .infrastructure.application import create_app, setup_middleware

__all__ = ["settings", "auth_router", "video_router", "me_router", "create_app", "setup_middleware",]