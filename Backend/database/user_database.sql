use db;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    passwd VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT FALSE
);



CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    product_description VARCHAR(255),
    product_image VARCHAR(255),
    product_price FLOAT,
    product_quantity INT
);
