/* Global Variables */
/*http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=dd6c3ba86f66f547459582b843e14bc8 */
const APIKey = '&appid=dd6c3ba86f66f547459582b843e14bc8';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const serverURL = 'http://localhost:8091'

//geonames:
const cityName = 'Boston'; // Replace with the name of the city you want to get the latitude for
//const geonamesURL = `http://api.geonames.org/searchJSON?q=miami&username=marcelomsilveira`
//const geonamesURL = `http://api.geonames.org/siblingsJSON?geonameId=3017382&username=MarceloMSilveira`

// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// begining

const goWeatherBit = async(data) => {
    const lat = data.geonames[0].lat;
    const lng = data.geonames[0].lng;
    const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=7dda27a7c2bf4cd0a4d3dc99beb71978&include=minutely`;
    fetch (weatherBitURL)
    .then(res => res.json())
    .then(data => console.log(`Return of weatherbit: ${data.city_name}`))
}

const getData = async (city) =>
{
    const geonamesURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=marcelomsilveira`
    fetch(geonamesURL)
    .then(response => response.json())
    .then(data => {
        goWeatherBit(data)
        //const name = data.geonames[0].name;
        //console.log(name); // This will log the name of the city to the console
        //console.log(data.geonames[0].lat);
        //console.log(data.geonames[0].lng);
        //console.log(data.geonames[0].countryName);
        
    })
    .catch(error => console.log(error));
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });
  
    try {
      const newData = await response.json();
      console.log(newData.temp, newData.date, newData.userResp);
      return newData;
    }catch(error) {
        console.log("error", error);
    }
};

const upDateUI = async ()=>{
    const dataRecieved = await fetch(`${serverURL}/all`);
    try {
        const response = await dataRecieved.json();
        document.getElementById('date').textContent = response.date;
        document.getElementById('temp').textContent = response.temp;
        document.getElementById('content').textContent = response.userResp;
        document.getElementById('cityName').textContent = response.cityName;

    }
    catch (error){
        console.log(error);
    }
}

function performAction() {
    const userCity = document.getElementById('city').value;
    const userCityUTF8 = encodeURIComponent(userCity)
    getData(userCityUTF8)
}

export {performAction}


