# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99) ;

INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES ('gold', 'gold', 'smiths', 'gold@smiths.com', '$2b$10$56IMMFyKK7MkJZt7zG9/Ue9jdZ5KDK5L4AEMYPpiXN9aeNXIKEELq');