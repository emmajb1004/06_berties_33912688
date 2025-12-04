// Create a new router
const express = require("express")
const router = express.Router()


router.get('/books', function (req, res, next) {

    // Read query parameters
    let search = req.query.search;
    let min = req.query.minprice;
    let max = req.query.maxprice;
    let sort = req.query.sort;   // <-- NEW

    // Start building query
    let sqlquery = "SELECT * FROM books WHERE 1=1";
    let params = [];

    // Filter: keyword search
    if (search) {
        sqlquery += " AND name LIKE ?";
        params.push('%' + search + '%');
    }

    // Filter: min price
    if (min) {
        sqlquery += " AND price >= ?";
        params.push(min);
    }

    // Filter: max price
    if (max) {
        sqlquery += " AND price <= ?";
        params.push(max);
    }

    // Sorting logic
    if (sort == "name") {
        sqlquery += " ORDER BY name ASC";
    } else if (sort == "price") {
        sqlquery += " ORDER BY price ASC";
    }

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json(err);
            return next(err);
        }
        res.json(result);
    });
});

// Export the router object so index.js can access it
module.exports = router