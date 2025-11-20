// Create a new router
const express = require("express")
const router = express.Router()

//password
const bcrypt = require('bcrypt')
const saltRounds = 10


//route handlers for registering users
router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    // saving data in database
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        //store hashed password in your database
        if (err) {
            return next(err)
        }
        let sqlquery = "INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES (?,?,?,?,?)"
        let newUser = [username, firstName, lastName, email, hashedPassword]

        db.query(sqlquery, newUser, (err, result) => {
            if (err) {
                next (err)
            }
            else {
                result = 'Hello '+ firstName + ' '+ lastName +' you are now registered!  We will send an email to you at ' + req.body.email
                result += ' Your password is: '+ plainPassword +' and your hashed password is: '+ hashedPassword
                res.send(result)
            };    
        })
    })                                                                          
}); 

//route handler for listing users
router.get('/list', function (req, res, next) {
    let sqlquery = "SELECT * FROM users"
    db.query(sqlquery, (err,result) => {
        if (err) {
            next(err)
        }
        res.render('users-list.ejs', {users: result})
    })
})

//route handlers for logging in users
router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

//route handlers for logging in users
router.post('/loggedin', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

        // Get hashed password for this user from database
        const sqlquery = "SELECT hashedPassword, firstName, lastName FROM users WHERE username = ?";

        db.query(sqlquery, [username], (err,results) => {
            if (err) {
                next (err);
            }
            if (results.length == 0) {
                return res.send("Login failed: username not found.");
            }

            const hashedPassword = results[0].hashedPassword;
            const firstName = results[0].firstName;
            const lastName = results[0].lastName;

            // Compare the password supplied with the password in the database
            bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
                if (err) {
                    next(err);
                }
                else if (result == true) {
                    res.send("Login successful! Welcome " + firstName + " " + lastName);
                }
                else {
                    res.send("Login failed. Incorrect Password")
                }
            })
        })
})

// Export the router object so index.js can access it
module.exports = router
