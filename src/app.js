const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherFetch = require('./utils/weatherFetch');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
const app = express();

//define path for express config 
// console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars engine and views location 
app.set('view engine', 'hbs'); //hbs is used to serve dynamic website template
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/weather', ( req, res ) => {
  const { address } = req.query;
  if(!address || address === '') {
    return res.send({
      error: 'You must provide an address.',
    });
  };
  // it is possible to use if else but more commmon pattern is to use "return"
  if(isNaN(address)) {
    geocode(address, (error, { latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }

      weatherFetch(latitude, longitude, (error, { location, current }) => {
        if (error) {
          return res.send({ error });
        }

        const { location_name: locationName, country } = location;
        const {
          observation_time: time,
          temperature,
          feelslike: feelTemp,
          weather_descriptions: forecast
        } = current;
        res.send({
          address,
          location: {locationName, country},
          forecast: `At ${time}, it is ${forecast}, temperature is ${temperature} feels like ${feelTemp}`,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  };

  console.log(req.query.search);
  res.send({
    products: [],
  });
})

app.get('', ( req, res ) => {
  res.render('index', {
    title: 'Weather app',
    name: 'StevenT'
  })
});

app.get('/about', ( req, res ) => {
  res.render('about', {
    title: 'About',
    name: 'StevenT'
  })
});

app.get('/help', ( req, res ) => {
  res.render('help', {
    message: 'Hello world!',
    name: 'StevenT',
    title: 'Help page'
  })
});

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    message: 'Help article is not found.',
    name: 'StevenT',
    title: '404 page'
  });
})

app.get('*', (req, res) => {
  res.render('notFound', {
    message: 'Page not found.',
    name: 'StevenT',
    title: '404 page'
  })
});

app.listen(3000, () => {
  console.log("server is up on port 3000")
});