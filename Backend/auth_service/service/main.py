from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth_routes import router as auth_router

app = FastAPI()

# You can include specific domains instead of '*' for more security
origins = [
    "http://localhost",         # For development
    "http://localhost:3000",    # If your frontend is running on a different port
    "https://yourfrontend.com", # For your production frontend
    # Add any other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # You can use ["*"] for development, but it's insecure for production
    allow_credentials=True,
    allow_methods=["*"],  # Or specify just the methods you need: ["POST", "GET"]
    allow_headers=["*"],  # Or specify just the headers you need
)

app.include_router(auth_router, prefix="/auth")
