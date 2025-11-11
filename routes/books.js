// Create a new router
const express = require("express")
const router = express.Router()

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE name LIKE ? "
    let search = ['%' + req.query.search_text + '%']
    if (!req.query.search_text) {
        return res.render("search-result.ejs", {searchResults: []});
    }
    db.query(sqlquery, search, (err,result) => {
        if (err) {
            next(err)
        }
        else
            res.render("search-result.ejs", {searchResults: result})       
    })
});

router.get('/list', function(req,res,next) {
    let sqlquery = "SELECT * FROM books"; //query database to get all the books
    
    //execute sql query
    db.query(sqlquery, (err,result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result})
    });
});

router.get('/addbook', function(req,res,next) {
    res.render("addbook.ejs");
})

router.post('/bookadded', function(req,res,next) {
    //saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
    //execute sql query
    let newrecord = [req.body.name, req.body.price]
    db.query(sqlquery, newrecord, (err,result) => {
        if (err) {
            next(err)
        }
        else
        res.send(`This book is added to database. Name: ${req.body.name}, Price: ${req.body.price}`);
    })
})

router.get('/bargainbooks', function(req,res,next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20";
    db.query(sqlquery, (err,result) => {
        if (err) {
            next(err)
        }
        res.render("bargainbooks.ejs", {availableBooks: result})
    })
})

// Export the router object so index.js can access it
module.exports = router
