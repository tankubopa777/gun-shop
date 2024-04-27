import bcrypt
from datetime import datetime, timedelta, timezone
import jwt
from config import (
    SECRET_KEY_ACCESS,
    ALGORITHM,
)
import requests
from database import get_database_connection


def verify_password(plain_password, hashed_password):
    try:
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode("utf-8")
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password)
    except ValueError as e:
        print(f"Error verifying password: {e}")
        return False


def get_password_hash(password):
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    hash = hash.decode("utf-8")
    return hash


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc).replace(tzinfo=None) + expires_delta
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY_ACCESS, algorithm=ALGORITHM)
    return encode_jwt


def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY_ACCESS, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise ValueError("Invalid token")
        return email
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")
    except jwt.PyJWKError:
        raise ValueError("Invalid token")
    except jwt.DecodeError:
        raise ValueError("Invalid token format")
    except Exception:
        raise ValueError("Invalid token")


def sentiment(text):
    url = "https://api.aiforthai.in.th/ssense"
    data = {"text": text}
    headers = {"Apikey": "iSQjiwWVg1qbg6TaqTAihilkL1trntuL"}
    try:
        response = requests.post(url, data=data, headers=headers)
        response = response.json()["sentiment"]

        pos = 0
        neg = 0
        if response["polarity-pos"]:
            pos = 1
        if response["polarity-neg"]:
            neg = 1
        response_data = {"positive": pos, "negative": neg}

        return response_data
    except Exception as e:
        raise (e)


# def getproductByID(id):
#     # Ensure the URL correctly incorporates the product ID
#     url = f"http://127.0.0.1:8001/product/getproductsByID/{id}?type={id}"
#     try:
#         product = requests.get(url)
#         product = product.json()
#         response = product["Product"]

#         return response
#     except Exception as e:
#         # Enhanced error handling to log the issue
#         print(f"Failed to fetch product with ID {id}: {str(e)}")
#         raise e



def getproductsByID(id):
    try:
        connection = get_database_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM db.products WHERE id = %s", (int(id),))
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

                return data
            else:
                return {"Product": None}

        finally:
            cursor.close()
            connection.close()
    except Exception as e:
        raise e
