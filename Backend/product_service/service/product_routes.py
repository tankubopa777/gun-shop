from fastapi import APIRouter, HTTPException, status, Depends
from database import get_database_connection
from fastapi.security import OAuth2PasswordBearer
from product_utils import decode_access_token, sentiment 
from models import User, TokenData, Reviews
from jose import JWTError
from typing import Annotated
from authen import JWTBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/allProduct")
def allProduct():
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.products")
            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[0],
                        "product_name": item[1],
                        "product_type": item[2],
                        "product_description": item[3],
                        "product_image": item[4],
                        "product_price": item[5],
                        "product_quantity": item[6],
                        "reviews": item[7],
                    }
                    allData.append(data)
                return {"Products": allData}
            else:
                return {"Products": None}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/getproductsByType/{type}")
def getproductsByType(type: str):
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.products WHERE product_type = %s", (type,))
            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[0],
                        "product_name": item[1],
                        "product_type": item[2],
                        "product_description": item[3],
                        "product_image": item[4],
                        "product_price": item[5],
                        "product_quantity": item[6],
                        "reviews": item[7],
                        "saled": item[8],
                        "reviews_quantity": item[9],
                        "positive": item[10],
                        "negative": item[11],
                    }
                    allData.append(data)
                return {"Products": allData}
            else:
                return {"Products": None}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/getproductsByID/{id}")
def getproductsByID(type: str):
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.products WHERE id = %s", (int(type),))
            myresult = cursor.fetchall()
            if myresult:
                item = myresult[0]
                data = {
                    "id": item[0],
                    "product_name": item[1],
                    "product_type": item[2],
                    "product_description": item[3],
                    "product_image": item[4],
                    "product_price": item[5],
                    "product_quantity": item[6],
                    "reviews": item[7],
                    "saled": item[8],
                    "reviews_quantity": item[9],
                    "positive": item[10],
                    "negative": item[11],
                }

                return {"Product": data}
            else:
                return {"Product": None}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    return token_data


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/reviews", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def read_users_me(data: Reviews):
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )

        cursor = connection.cursor()
        try:
            query = 'UPDATE products SET reviews = JSON_SET(COALESCE(reviews, JSON_OBJECT("comments", JSON_ARRAY())), "$.comments", JSON_ARRAY_APPEND(COALESCE(JSON_EXTRACT(reviews, "$.comments"), JSON_ARRAY()), "$", JSON_OBJECT("username", %s, "comment", %s))) WHERE id = %s;'
            cursor.execute(query, (data.username, data.comment, data.product_id))
            sentiment_output = sentiment(data.comment)

            cursor.execute(
                "UPDATE products SET reviews_quantity = reviews_quantity + 1, positive = positive + %s, negative = negative + %s  WHERE id = %s",
                (
                    sentiment_output["positive"],
                    sentiment_output["negative"],
                    data.product_id,
                ),
            )

            connection.commit()
        finally:
            cursor.close()
            connection.close()

        return data
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid activation token")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/getFiveMostSaled/")
def getFiveMostSaled():
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute(
                "SELECT id, product_name, product_type, saled FROM db.products WHERE saled > 0 ORDER BY saled DESC LIMIT 5"
            )

            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[0],
                        "product_name": item[1],
                        "product_type": item[2],
                        "saled": item[3],
                    }
                    allData.append(data)
                return {"Products": allData}
            else:
                return {"Products": None}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/getFiveMostReviews/")
def getFiveMostReviews():
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute(
                "SELECT id, product_name, product_type, reviews_quantity, positive, negative FROM db.products WHERE reviews_quantity > 0 ORDER BY reviews_quantity DESC LIMIT 5"
            )

            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[0],
                        "product_name": item[1],
                        "product_type": item[2],
                        "reviews_quantity": item[3],
                        "positive(%)": ((item[4] / (item[4] + item[5])) * 100),
                        "negative(%)": ((item[5] / (item[4] + item[5])) * 100),
                    }
                    allData.append(data)
                return {"Products": allData}
            else:
                return {"Products": None}

        finally:
            cursor.close()
            connection.close()
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
