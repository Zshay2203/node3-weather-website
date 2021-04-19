const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(publicDirectoryPath);

const app = express();

// Setup handlebars engine and views locations.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to server::
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shay Z.'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shay Z.'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shay Zukerman',
        helpText: 'This is a Help page for the Weather app!!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shay Zukerman',
        errorMessage: 'Help article not!'
    });
});


app.get('/weather', (req, res) => {
    // Check the request's query string?
    if (!req.query.address) {
        return (res.send({
            error: 'Address must be provided'
        }));
    }
    const address = decodeURIComponent(req.query.address);

    getForecast(address, (forRes) => {
        res.send(
            forRes
        );
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return (res.send({
            error: ' You must provide search term'
        }));
    }


    console.log(req.query.search);
    res.send({
        products: []
    });
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shay Zukerman',
        errorMessage: 'Page not found!'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

const getForecast = (locName, clbFnc) => {

    geocode(locName, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return (clbFnc({
                error: error
            }));
        }

        console.log('Error:', error)
        forecast(longitude, latitude, (error, {
            temperature,
            feelslike,
            location
        }) => {
            if (error) {
                return (clbFnc({
                    error: error
                }));
            }
            console.log('Temp: ', temperature, ' feelslike: ', feelslike, ' name: ', location);
            clbFnc({
                error: error,
                address: locName,
                location: location,
                temperature: temperature,
                feelslike: feelslike
            });
        })

    });
}