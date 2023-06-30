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

//post route
//post route to recieve text to be analized
app.post('/geonames', (req,res)=> {
    console.log(req.body.userAsk)
    let user_city = req.body.userAsk
    askGeonames(user_city)
    .then (
      (data) => {
        console.log(`in dataPost: ${data.subjectivity}`)
        res.send(data)
      }
    )
  })

  const askGeonames = async (city) =>
    {
        const geonamesURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
        fetch(geonamesURL)
        .then(response => response.json())
        .then(data => {
            console.log(data.geonames[0].countryName)})
            //goWeatherBit(data)})
        .catch(error => console.log(error));
    }
    