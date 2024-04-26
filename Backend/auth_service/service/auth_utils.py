import bcrypt
from datetime import datetime, timedelta, timezone
import jwt
from config import (
    SECRET_KEY_ACCESS,
    ALGORITHM,
    SECRET_KEY_ACTIVATION,
    LINK,
    SENDER_EMAIL,
    APP_PASSWORD,
)
import smtplib
from email.mime.text import MIMEText


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
    except jwt.PyJWKError:
        raise ValueError("Invalid token")


def decode_activation_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY_ACTIVATION, algorithms=[ALGORITHM])

        email: str = payload.get("sub")
        if email is None:
            raise ValueError("Invalid token")
        return email
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.PyJWKError:
        raise ValueError("Invalid token")


def create_activation_token(email):
    return jwt.encode({"sub": email}, SECRET_KEY_ACTIVATION, algorithm=ALGORITHM)


def send_activation_email(email, token):
    host = "smtp.gmail.com"
    port = 587

    activation_link = f"{LINK}/auth/activate/{token}"
    msg = MIMEText(
        f"Click the following link to activate your account: {activation_link}"
    )
    msg["Subject"] = "Activate Your Account"
    msg["From"] = SENDER_EMAIL
    msg["To"] = email

    with smtplib.SMTP(host, port) as server:
        server.starttls()
        server.login(SENDER_EMAIL, APP_PASSWORD)
        server.sendmail(SENDER_EMAIL, [email], msg.as_string())
