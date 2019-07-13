DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price DECIMAL (6,2) DEFAULT 0,
stock_quantity INT DEFAULT 0,
PRIMARY KEY (item_id)
);

SELECT * FROM products;