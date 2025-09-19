from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "FastAPI"
    debug: bool = True

    database_url: str = ""
    database_url_alembic: str = ""
    database_echo: bool = False
    secret_key: str = ""
    client_secret: str = ""
    client_id: str = ""
    frontend_url: str = ""
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        

settings: Settings = Settings()