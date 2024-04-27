from fastapi import APIRouter, HTTPException, status, Depends, Header
from database import get_database_connection
from fastapi.security import OAuth2PasswordBearer
from order_utils import decode_access_token
from models import Order, User, TokenData, basket
import requests

from jose import JWTError
from typing import Annotated
from authen import JWTBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/getAllOrder")
async def allOrder():
    try:
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.orders")
            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[1],
                        "product_name": item[2],
                        "product_price": item[4],
                        "order_quantity": item[5],
                        "username": item[6],
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


@router.get("/getOrderByToken", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def getOrderByToken(Authorization: str = Header(None)):
    try:
        token = Authorization.split()[1]
        email = decode_access_token(token)
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute(
                "SELECT * FROM db.orders WHERE username = %s",
                (email,),
            )
            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[1],
                        "product_name": item[2],
                        "product_price": item[4],
                        "order_quantity": item[5],
                        "username": item[6],
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


# @router.get("/getproductsByType/{type}")
# def getproductsByType(type: str):
#     try:
#         connection = get_database_connection()
#         if not connection:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="Database connection failed",
#             )
#         cursor = connection.cursor()
#         try:
#             cursor.execute("SELECT * FROM db.products WHERE product_type = %s", (type,))
#             myresult = cursor.fetchall()
#             if myresult:
#                 allData = []
#                 for item in myresult:
#                     data = {
#                         "id": item[0],
#                         "product_name": item[1],
#                         "product_type": item[2],
#                         "product_description": item[3],
#                         "product_image": item[4],
#                         "product_price": item[5],
#                         "product_quantity": item[6],
#                         "reviews": item[7],
#                         "saled": item[8],
#                         "reviews_quantity": item[9],
#                         "positive": item[10],
#                         "negative": item[11],
#                     }
#                     allData.append(data)
#                 return {"Products": allData}
#             else:
#                 return {"Products": None}

#         finally:
#             cursor.close()
#             connection.close()
#     except Exception:
#         raise HTTPException(status_code=500, detail="Internal Server Error")


# @router.get("/getproductsByID/{id}")
# def getproductsByID(type: str):
#     try:
#         connection = get_database_connection()
#         if not connection:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="Database connection failed",
#             )
#         cursor = connection.cursor()
#         try:
#             cursor.execute("SELECT * FROM db.products WHERE id = %s", (int(type),))
#             myresult = cursor.fetchall()
#             if myresult:
#                 item = myresult[0]
#                 data = {
#                     "id": item[0],
#                     "product_name": item[1],
#                     "product_type": item[2],
#                     "product_description": item[3],
#                     "product_image": item[4],
#                     "product_price": item[5],
#                     "product_quantity": item[6],
#                     "reviews": item[7],
#                     "saled": item[8],
#                     "reviews_quantity": item[9],
#                     "positive": item[10],
#                     "negative": item[11],
#                 }

#                 return {"Product": data}
#             else:
#                 return {"Product": None}

#         finally:
#             cursor.close()
#             connection.close()
#     except Exception:
#         raise HTTPException(status_code=500, detail="Internal Server Error")


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


@router.post("/buy", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def read_users_me(data: Order, Authorization: str = Header(None)):
    try:
        token = Authorization.split()[1]
        email = decode_access_token(token)
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )

        # Using a context manager to handle the cursor's lifecycle
        cursor = connection.cursor()
        cursor.execute(
            "SELECT product_name, product_type, product_price, product_quantity, saled FROM db.products WHERE id = %s;",
            (data.product_id,),
        )

        myresult = cursor.fetchall()
        myresult = myresult[0]

        if myresult[3] - data.order_quantity > 0:
            cursor.execute(
                "INSERT INTO orders (product_id, product_name, product_type, product_price, order_quantity, username, customer_name, user_address, user_phone) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    data.product_id,
                    myresult[0],
                    myresult[1],
                    myresult[2],
                    data.order_quantity,
                    email,
                    data.name,
                    data.address,
                    data.phone,
                ),
            )
            cursor.execute(
                "UPDATE products SET product_quantity = product_quantity - %s, saled = saled + %s  WHERE id = %s",
                (
                    data.order_quantity,
                    data.order_quantity,
                    data.product_id,
                ),
            )

            connection.commit()
        else:
            return {"detail": "Ran out of stock"}

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid activation token")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Product service is unavailable")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        if connection:
            connection.close()

    return data


@router.post("/addBasket", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def addbasket(data: basket, Authorization: str = Header(None)):
    try:
        token = Authorization.split()[1]
        email = decode_access_token(token)
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )

        # Using a context manager to handle the cursor's lifecycle
        cursor = connection.cursor()
        cursor.execute(
            "SELECT product_name, product_type, product_price, product_quantity, saled FROM db.products WHERE id = %s;",
            (data.product_id,),
        )

        myresult = cursor.fetchall()
        myresult = myresult[0]

        if myresult[3] - data.order_quantity > 0:
            cursor.execute(
                "INSERT INTO basket (product_id, product_name, product_type, product_price, order_quantity, username) VALUES (%s, %s, %s, %s, %s, %s)",
                (
                    data.product_id,
                    myresult[0],
                    myresult[1],
                    myresult[2],
                    data.order_quantity,
                    email,
                ),
            )

            connection.commit()
        else:
            return {"detail": "Ran out of stock"}

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid activation token")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Product service is unavailable")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        if connection:
            connection.close()

    return data


@router.get("/getBasketByToken", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def getBasketByToken(Authorization: str = Header(None)):
    try:
        token = Authorization.split()[1]
        email = decode_access_token(token)
        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )
        cursor = connection.cursor()
        try:
            cursor.execute(
                "SELECT * FROM db.basket WHERE username = %s",
                (email,),
            )
            myresult = cursor.fetchall()
            if myresult:
                allData = []
                for item in myresult:
                    data = {
                        "id": item[0],
                        "product_id": item[1],
                        "product_name": item[2],
                        "product_price": item[4],
                        "order_quantity": item[5],
                        "username": item[6],
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


@router.post("/deleteBasket", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def deleteBasket(id: int):
    try:

        connection = get_database_connection()
        if not connection:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database connection failed",
            )

        # Using a context manager to handle the cursor's lifecycle
        cursor = connection.cursor()
    

        
        cursor.execute(
                "DELETE FROM db.basket WHERE id = %s;",
                (
                    (id),
                ),
            )

        connection.commit()

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid activation token")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Product service is unavailable")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        if connection:
            connection.close()

    return {'detail': 'Deleted'}


# @router.get("/getFiveMostSaled/")
# def getFiveMostSaled():
#     try:
#         connection = get_database_connection()
#         if not connection:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="Database connection failed",
#             )
#         cursor = connection.cursor()
#         try:
#             cursor.execute(
#                 "SELECT id, product_name, product_type, saled FROM db.products WHERE saled > 0 ORDER BY saled DESC LIMIT 5"
#             )

#             myresult = cursor.fetchall()
#             if myresult:
#                 allData = []
#                 for item in myresult:
#                     data = {
#                         "id": item[0],
#                         "product_name": item[1],
#                         "product_type": item[2],
#                         "saled": item[3],
#                     }
#                     allData.append(data)
#                 return {"Products": allData}
#             else:
#                 return {"Products": None}

#         finally:
#             cursor.close()
#             connection.close()
#     except Exception:
#         raise HTTPException(status_code=500, detail="Internal Server Error")


# @router.get("/getFiveMostReviews/")
# def getFiveMostReviews():
#     try:
#         connection = get_database_connection()
#         if not connection:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="Database connection failed",
#             )
#         cursor = connection.cursor()
#         try:
#             cursor.execute(
#                 "SELECT id, product_name, product_type, reviews_quantity, positive, negative FROM db.products WHERE reviews_quantity > 0 ORDER BY reviews_quantity DESC LIMIT 5"
#             )

#             myresult = cursor.fetchall()
#             if myresult:
#                 allData = []
#                 for item in myresult:
#                     data = {
#                         "id": item[0],
#                         "product_name": item[1],
#                         "product_type": item[2],
#                         "reviews_quantity": item[3],
#                         "positive(%)": ((item[4] / (item[4] + item[5])) * 100),
#                         "negative(%)": ((item[5] / (item[4] + item[5])) * 100),
#                     }
#                     allData.append(data)
#                 return {"Products": allData}
#             else:
#                 return {"Products": None}

#         finally:
#             cursor.close()
#             connection.close()
#     except Exception:
#         raise HTTPException(status_code=500, detail="Internal Server Error")
