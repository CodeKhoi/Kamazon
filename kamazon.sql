CREATE DATABASE kamazon;

USE kamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT PRIMARY KEY, 
	product_name VARCHAR(100), 
	department_name VARCHAR(50), 
	price DECIMAL(6,2), 
	stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Learn to Code Book', 'Books', 18.95, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('Mass Effect 3', 'Video Games', 26.50, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dell XPS 13', 'Electronics', 899.98, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hoover Vacuum', 'Appliances', 167.34, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation 4', 'Electronics', 349.97, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Running Sneakers', 'Footwear', 74.59, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Band T-shirt', 'clothing', 19.50, 94);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Down Comforter', 'bedding', 46.89, 29);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Diamond Necklace', 'Jewlery', 524.76, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Blendtec Blender', 'Kitchen', 369.99, 15);

SELECT * FROM products;

+--------+--------------------+----------------+--------+---------------+
| ItemID | ProductName        | DepartmentName | Price  | StockQuantity |
+--------+--------------------+----------------+--------+---------------+
|      1 | Learn to Code Book | Books          |  18.95 |            37 |
|      2 | Mass Effect 3      | Video Games    |  26.50 |            18 |
|      3 | Dell XPS 13        | Electronics    | 899.98 |             7 |
|      4 | Hoover Vacuum      | Appliances     | 167.34 |            22 |
|      5 | Playstation 4      | Electronics    | 349.97 |             4 |
|      6 | Running Sneakers   | Footwear       |  74.59 |            65 |
|      7 | Band T-shirt       | clothing       |  19.50 |            94 |
|      8 | Down Comforter     | bedding        |  46.89 |            29 |
|      9 | Diamond Necklace   | Jewlery        | 524.76 |             6 |
|     10 | Blendtec Blender   | Kitchen        | 369.99 |            15 |
+--------+--------------------+----------------+--------+---------------+