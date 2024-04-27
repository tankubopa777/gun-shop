from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from product_routes import router as product_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://yourfrontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router, prefix="/product")
