
const goWeatherBit = async(data) => {
    // place's coordinates
    const lat = data.geonames[0].lat;
    const lng = data.geonames[0].lng;
    
    // how many days is the trip from now (calculating)
    const currentDate = new Date();
    const tripDate = new Date(document.getElementById('tripDate').value);
    const tripBack = new Date(document.getElementById('backDate').value)
    const diffTime = Math.abs(tripDate - currentDate);
    const diffTimeOfTrip = Math.abs(tripBack - tripDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffDaysOfTrip = Math.ceil(diffTimeOfTrip / (1000 * 60 * 60 * 24))+1
    document.getElementById('when').innerHTML=`Your travel is ${diffDays} days from now!`;
    document.getElementById('howLong').innerHTML=`And it will be ${diffDaysOfTrip} days long.`;

    //decide if travel will be next week

    if (diffDays>7) 
        nextWeekForecast(lat, lng)
    else 
        postCurrentWeather(lat, lng)
    
}

async function postCurrentWeather (lat, lon) {
    const url = "http://localhost:8091/currentWeather"
    const data = {lat: lat, lon: lon}
    const postConfigObj = {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data) 
    }
    const response = await fetch(url, postConfigObj)
    try {
      const newData = await response.json();
      console.log(newData.data[0].weather.description);
      const msg = `The current weather in ${newData.data[0].city_name} is ${newData.data[0].weather.description} Temperature: ${newData.data[0].temp}ºC`;
      document.getElementById('result').innerHTML = msg;
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

//unfortunately it is not possible to get the weather history with the free version, so I used the forecast for the next week 
async function nextWeekForecast (lat, lon) {
    const url = "http://localhost:8091/nextWeekForecast"
    const data = {lat: lat, lon: lon}
    const postConfigObj = {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data) 
    }
    const response = await fetch(url, postConfigObj)
    try {
      const newData = await response.json();
      console.log(newData.data[0].weather.description);
      const msg = `The forecast (next week) weather in ${newData.city_name} is ${newData.data[6].weather.description}, <span>HIGH: </span>${newData.data[6].high_temp} ºC <span>LOW: </span>${newData.data[6].low_temp} ºC`;
      document.getElementById('result').innerHTML = msg;

    } catch(error) {
        console.log("error", error);
    }
}

const getGeonamesData = async (city) =>
{
    const url = "http://localhost:8091/geonames"
    const userObj = {userAsk: city}
    const geonamesAnswer = await postData(url,userObj)
    try {
        goWeatherBit(geonamesAnswer)
    }catch(error) {
        console.log("error", error);
    }
}

const getPixabayData = async (userCity,cityUTF8) =>
{
    const userObj = {place: cityUTF8}
    const URL = "http://localhost:8091/pixabay"
    const data = await postData(URL,userObj)
    try {
            if (data.total>0)
                getImage(userCity,data)
            else   
                unknowCity(cityUTF8)
    }
    catch(error) {
        console.log("error", error);
    }
    
}

async function getCountryImage (countryName) {
    const userObj = {place: countryName}
    const URL = "http://localhost:8091/pixabay"
    const data = await postData(URL,userObj)
    try {
          getImage(countryName,data)      
    }
    catch(error) {
        console.log("error", error);
    }
}

function getImage(place,pixabayResponse) {
    // Img element acess
    const imgElement = document.getElementById('imgFromPixabay');
    
    // URL of image link to pixabayResp
    const numberOfImg = pixabayResponse.total;
    
    const randomImgIndex = Client.validateWebURL(pixabayResponse,numberOfImg)
    
    console.log(`Nr of img of ${place}: ${numberOfImg}. Index of choosed img: ${randomImgIndex}`)
    const imgURL = pixabayResponse.hits[randomImgIndex].webformatURL;
    imgElement.style.backgroundImage = `url(${imgURL})`;
    imgElement.ariaLabel = `image of ${place}`
    document.getElementById('myTrip').innerHTML = `Take a look at ${place}:`
}

async function unknowCity(cityUTF8){
    const url = "http://localhost:8091/geonames"
    const userObj = {userAsk: cityUTF8}
    const geonamesAnswer = await postData(url,userObj)
    try {
        const countryName = geonamesAnswer.geonames[0].countryName;
        getCountryImage(countryName)
    }catch(error) {
        console.log("error", error);
    }
}

async function postData ( url = '', data = {}) {
  const postConfigObj = {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data) 
    }
    const response = await fetch(url, postConfigObj)
    try {
      const newData = await response.json();
      //console.log(newData.agreement);
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  }



function performAction() {
    const userCity = document.getElementById('city').value;
    const userCityUTF8 = encodeURIComponent(userCity)
    getGeonamesData(userCityUTF8)
    getPixabayData(userCity,userCityUTF8)
}

export {performAction}


