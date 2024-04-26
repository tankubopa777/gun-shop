from pydantic import BaseModel

class TokenData(BaseModel):
    username: str 


class User(BaseModel):
    username: str

class Reviews(BaseModel):
    product_id: int
    username: str
    comment: str
   


   
