from fastapi import FastAPI
from auth_routes import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")