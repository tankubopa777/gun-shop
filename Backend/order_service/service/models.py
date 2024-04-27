from pydantic import BaseModel


class TokenData(BaseModel):
    username: str


class User(BaseModel):
    username: str


class Order(BaseModel):
    product_id: int
    name: str
    address: str
    phone: str
    order_quantity: int

class basket(BaseModel):
    product_id: int
    order_quantity: int
