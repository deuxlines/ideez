from pydantic import BaseModel

class GoogleToken(BaseModel):
    token: str