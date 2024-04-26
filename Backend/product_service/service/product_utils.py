import bcrypt
from datetime import datetime, timedelta, timezone
import jwt
from config import (
    SECRET_KEY_ACCESS,
    ALGORITHM,
)


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
