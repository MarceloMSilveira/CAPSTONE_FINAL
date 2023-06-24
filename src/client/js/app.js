
const goWeatherBit = async(data) => {
    // place's coordinates
    const lat = data.geonames[0].lat;
    const lng = data.geonames[0].lng;
    
    // how many days is the trip from now (calculating)
    const currentDate = new Date();
    const tripDate = new Date(document.getElementById('tripDate').value);
    const diffTime = Math.abs(tripDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    //decide if travel will be next week

    if (diffDays>7) 
        predictedForecast(tripDate, lat, lng)
    else 
        currentWeather(lat, lng)
    
}

function currentWeather (lat, lon) {
    const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=7dda27a7c2bf4cd0a4d3dc99beb71978&include=minutely`;
    fetch (weatherBitURL)
    .then(res => res.json())
    .then(resp => {
        console.log(`Return of weatherbit: ${resp.data[0].valid_date}, ${resp.data[1].valid_date}, ${resp.data[2].valid_date}`)
        console.log(`Your travel is ${diffDays} days from now!`);
    })
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


