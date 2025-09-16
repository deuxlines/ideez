from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core import *

engine = create_engine(
    settings.database_url,
    echo=settings.database_echo
)

SessionLocal: sessionmaker[Session] = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()