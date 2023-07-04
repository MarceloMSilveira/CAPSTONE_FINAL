// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const path = require ('path')
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
//app.use(express.static('src'));
//app.use('/src', express.static(path.join(__dirname, '..')))
app.use(express.static('dist'))

console.log(__dirname);
// Setup Server
const port = 8091;

app.listen(port,()=>console.log(`Server up on ${port}`));

//get route
app.get('/all', (req,res)=> {
    console.log(projectData);
    res.send(projectData);
})

app.get('/', (req,res)=> {
    res.sendFile('dist/index.html');
})

//post route to acess geonames:

app.post('/geonames', (req,res)=> {
    const user_city = req.body.userAsk
    const geonamesURL = `http://api.geonames.org/searchJSON?q=${user_city}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
    fetch(geonamesURL)
    .then(resp=>resp.json())
    .then (
      (data) => {
        console.log(`in dataPost after fetch Country: ${data}`)
        res.send(data)
      }
    )
    .catch(error => console.log(error));
})

app.post('/currentWeather', (req,res)=> {
    const lat = req.body.lat
    const lon = req.body.lon
    const weatherBitURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WHEATERBIT_KEY}`;
    fetch (weatherBitURL)
    .then(res => res.json())
    .then (
      (resp) => {
        console.log(`(inside post) current weather after fetch: ${resp.data[0].weather.description}`)
        res.send(resp)
      }
    )
    .catch(error => console.log(error));
})

app.post('/nextWeekForecast', (req,res)=> {
    const lat = req.body.lat
    const lon = req.body.lon
    const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WHEATERBIT_KEY}`;
    fetch (weatherBitURL)
    .then(res => res.json())
    .then (
      (resp) => {
        console.log(`(inside post) current weather after fetch: ${resp.data[0].weather.description}`)
        res.send(resp)
      }
    )
    .catch(error => console.log(error));
})

//post route to pixabay
app.post('/pixabay', (req,res)=> {
    const place = req.body.place
    const pixabayURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${place}+tourism&image_type=photo&category=travel`
    fetch(pixabayURL)
    .then(resp=>resp.json())
    .then (
      (data) => {
        console.log(`(inside PIXABAY post) total answers : ${data.total}`)
        res.send(data)
      }
    )
    .catch(error => console.log(error));
})