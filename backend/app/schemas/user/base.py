from pydantic import BaseModel

class Base(BaseModel):
    name: str | None = None
    