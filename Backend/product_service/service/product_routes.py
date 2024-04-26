from fastapi import APIRouter, HTTPException, status
from database import get_database_connection

router = APIRouter()


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
