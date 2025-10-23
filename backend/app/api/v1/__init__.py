from .authorization import auth_router
from .videos import video_router
from .me import me_router
from .users import user_router

__all__ = ["auth_router", "video_router", "me_router", "user_router",]