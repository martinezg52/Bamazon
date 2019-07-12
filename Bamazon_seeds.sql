USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Javascript Ultimate Manual", "Books", 22.50, 15),
("Gucci Classic Sneakers", "Shoes", 750.50, 12),
("Zelda Nintendo Switch", "Games", 49.99, 10),
("HTML Beginner's Guide", "Books", 19.75, 15),
("Buzz Light Year", "Toys", 10.99, 20),
("Toy Story 2", "Movies", 12.25, 10),
("Dog Leash 6 ft", "Pets", 6.99, 30),
("Cat Litter Box", "Pets", 13.50, 45),
("Lucky Number Slevin", "Movies", 12.25, 12),
("Linux T-Shirt XL", "Clothing", 18.99, 50);

SELECT * FROM products;
