# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

# Thirsty Student
A node.js web application about a bookshop. You can see available books, bargain books, search for books, register, add books, and see the about page. 

## Technololgies Used
HTML is used for structuring the pages. They are stored in the views folder. 
The bootstrap CSS library is used for styling the webpage
EJS templates is used as a templating engine for Javascript to generate dynamic HTML web pages
Express is the web framework for Node.js which serves the HTTP server.
Also uses the Node Package Manager (npm)
Uses SQL as the backend database

## How to Install and Run

git clone https://github.com/emmajb1004/06_berties_33912688.git
cd 06_berties_33912688

To install and run:

npm install
node index.js

To execute javascript file run node followed by the file's name (i.e. node index.js)

Web page should run on port 8000 (http://localhost:8000/)

## dotenv
Dotenv is a module used to secure database credentials. Sensitive information like the username and password are stored in a .env file, which is ignored by GitHub becasue it contains out secret database credentials. The application loads these variables using require('dotenv').config() that is in index.js.

## audit
I created a logins table to store the login attempts. I used a similar technique for the other list pages to create the audit page. It queries the logins database and shows the username of the attempted login, if it was succesful and what time the login attempt was. I created a route for the audit page and edited the loggedin route to insert the login attempt into the logins database.

## week 8 extension task 5 8a
I added access control to add books because it makes sense to not let any user add books, they should have to register. I did not add access control to the other parts of the website as I believe people should be able to search for books without having to be registered and it wouldn't make sense to add access control to registration as no one then would be able to use the website.

## week 8 extension task 7 8bc
I added sanitization to the username and email but not the password because if we sanitize the password it could create login failures and change the users password without them knowing. The username and email are displayed back to the user therefore they should be sanitized.  

## week 8 extension task 7 8bc
I also added sanitization to the add books section for the title as the user could also put a harmful input there as well.