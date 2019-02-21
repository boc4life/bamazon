CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name varchar(100) NOT NULL,
    department_name varchar(50) NOT NULL,
    price decimal(5,2) NOT NULL,
    stock_quantity int NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Flannel T-Shirt', 'Clothing', 20.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Flat-Screen TV', 'Electronics', 750.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Khaki Pants', 'Clothing', 30.00, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Bakeware Set', 'Kitchen', 95.00, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Playstation 4', 'Electronics', 399.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Brita Filter Jug', 'Kitchen', 20.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Shower Curtain', 'Bathroom', 10.00, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Bath Mat', 'Bathroom', 20.00, 800);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Car Air Freshener', 'Automotive', 30.00, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Emergency Roadside Kit', 'Automotive', 30.00, 400);