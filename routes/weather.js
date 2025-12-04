// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

const redirectLogin = (req, res, next) => {
        if (!req.session.userId ) {
          res.redirect('/users/login') // redirect to the login page
        } else { 
            next (); // move to the next middleware function
        } 
    }


//route handlers for registering users
router.get('/now', function (req, res, next) {
            res.render("weather.ejs")
})

// handle form submission
router.post("/city-weather", (req, res, next) => {
    let apiKey = process.env.WEATHER_API_KEY;
    let city = req.body.city; // user input

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }

        try {
            let weather = JSON.parse(body);

            // API error (wrong city, invalid key, etc.)
            if (!weather.main) {
                return res.send(
                    `Could not find weather data for "${city}".<br><br>Response:<br>${body}`
                );
            }

            let wmsg =
                `Weather in ${weather.name}:<br>` +
                `Temperature: ${weather.main.temp}°C<br>` +
                `Humidity: ${weather.main.humidity}%<br>` +
                `Conditions: ${weather.weather[0].description}`;

            res.send(wmsg);

        } catch (parseError) {
            next(parseError);
        }
    });
});

// Export the router object so index.js can access it
module.exports = router