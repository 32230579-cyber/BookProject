DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  address VARCHAR(255),
  book_title VARCHAR(255),
  book_image VARCHAR(255)
);

