from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import settings

def setup_middleware(app: FastAPI) -> None:
    origins = [settings.frontend_url]
    
    app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods = ["GET", "POST", "PUT", "DELETE"],
            allow_headers = ["Authorization", "Content-Type"]
        )