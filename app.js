// Imports..
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

const app = express();

// Set the Template Engine..
app.set('view engine', 'hbs');

// settting up..
const publicDirectoryPath = path.join(__dirname, 'public');
const viewTemplateDirectory = path.join(__dirname, '/templates/views');
const partialTemplateDirectory = path.join(__dirname, '/templates/partials');
hbs.registerPartials(partialTemplateDirectory);

// Set-up the Default settings..
app.set('views', viewTemplateDirectory);

// Middlewares..
app.use(express.static(publicDirectoryPath));


// Homes Route..
app.get('/', (req, res) => {
    res.render('index', {
        title: 'HOME',
        welcomeText: 'Weather Checker!',
        author: 'Asad Anik',
        year: 2021
    });
});

// Weathers Route..
app.get('/weather', (req, res) => {
    const city = req.query.city;
    const country = req.query.country;

    if (!city || !country) {
        return res.send({
            error: 'Address not found (City Or Country)',
            message: 'Address is required!, please provide city and country.'
        });
    }

    // geocode api will receive city & country to ganarate lat & lon for weather api..
    geocode(city, country, function (error, geocodeData) {
        if (error) return res.send({ status: error, errorDetected: 'An error cames from Geocode!' });

        // destructure lat & lon..
        const { lat, lon } = geocodeData;

        // weather will receive lat & lon...
        weather(lat, lon, function (error, weatherData) {
            if (error) return res.send({ status: error, errorDetected: 'An error cames from Weather!' });

            res.send({
                status: 'Successful!',
                data: weatherData,
            });
        });
    });

    // res.render('weather', {
    //     title: 'WEATHER',
    //     welcomeText: 'See weathers!',
    //     author: 'Asad Anik',
    //     year: 2021
    // });
});

// Page not found Route..
app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        errTitle: '404 Page not found!',
        errBody: 'This page is not exists into server.'
    });
});


// Server..
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});