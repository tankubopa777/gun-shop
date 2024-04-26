from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth_utils import (
    get_password_hash,
    create_activation_token,
    send_activation_email,
    decode_activation_token,
    create_access_token,
    verify_password,
)
from database import get_database_connection
import uuid
import mysql.connector
from fastapi.templating import Jinja2Templates
from datetime import timedelta
from config import ACCESS_TOKEN_EXPIRE_MINUTES


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
templates = Jinja2Templates(directory="templates")


@router.post("/register/")
async def register(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    id = uuid.uuid4().hex
    username = form_data.username
    password = str(get_password_hash(form_data.password))
    activate_token = create_activation_token(username)

    connection = get_database_connection()
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (id, email, passwd) VALUES (%s, %s, %s)",
                (id, username, password),
            )
            connection.commit()
            return {"status": "user created"}
        except mysql.connector.Error as err:
            return {"status": "error", "message": str(err)}
        finally:
            send_activation_email(username, activate_token)
            cursor.close()
            connection.close()
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed",
        )


@router.post("/admin_register/")
async def admin_register(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    if not form_data.username.endswith("@dome.tu.ac.th"):
        return {
            "status": "error",
            "message": "Invalid email format. Email must end with @dome.tu.ac.th",
        }

    id = uuid.uuid4().hex
    username = form_data.username
    password = str(get_password_hash(form_data.password))
    is_admin = True

    connection = get_database_connection()
    activate_token = create_activation_token(username)
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (id, email, passwd, is_admin) VALUES (%s, %s, %s, %s)",
                (id, username, password, is_admin),
            )
            connection.commit()
            send_activation_email(username, activate_token)
            return {"status": "user created"}
        except mysql.connector.Error as err:
            return {"status": "error", "message": str(err)}
        finally:
            cursor.close()
            connection.close()
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed",
        )


@router.get("/activate/{token}")
async def activate_account(token: str, request: Request):
    try:
        email = decode_activation_token(token)
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )

        cursor = connection.cursor()
        try:
            cursor.execute(
                "UPDATE users SET is_active = TRUE WHERE email = %s", (email,)
            )
            connection.commit()
        finally:
            cursor.close()
            connection.close()

        return templates.TemplateResponse(
            "activation_success.html", {"request": request}
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid activation token")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/login/")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    username = form_data.username
    password = form_data.password
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.users WHERE email = %s", (username,))
            myresult = cursor.fetchall()
            myresult = myresult[0]

            data = {
                "id": myresult[0],
                "email": myresult[1],
                "password": myresult[2],
                "is_admin": myresult[3],
                "is_active": myresult[4],
            }
            print(verify_password(password, data["password"]))

            if verify_password(password, data["password"]) and (data["is_active"] == 1):
                access_token = create_access_token(
                    {"sub": data["email"]},
                    timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
                )
                return {
                    "id": myresult[0],
                    "email": myresult[1],
                    "token": access_token,
                    "is_admin": data["is_admin"],
                }
            else:
                return {"detail": "Username or password is not correct."}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
