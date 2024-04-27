from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from order_routes import router as order_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://yourfrontend.com",
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:8002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(order_router, prefix="/order")
