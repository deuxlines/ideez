from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = ""
    debug: bool = True

    database_url: str = "sqlite:///.db"
    database_url_alembic: str = "sqlite:///.db"
    database_echo: bool = False
    secret_key: str = ""
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        

settings: Settings = Settings()