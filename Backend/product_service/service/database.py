import mysql.connector
from mysql.connector import Error
from config import HOST_DB, USER_DB, PASSWORD_DB, DATABASE


def get_database_connection():
    try:
        connection = mysql.connector.connect(
            host=HOST_DB, user=USER_DB, password=PASSWORD_DB, database=DATABASE
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None
