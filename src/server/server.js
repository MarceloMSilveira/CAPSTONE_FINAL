// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const path = require ('path')

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
app.post('/dataPost', (req,res)=> {
    
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResp = req.body.userResp;
    projectData.cityName = req.body.cityName;
})