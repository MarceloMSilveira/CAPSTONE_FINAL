/* Global Variables */
/*http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=dd6c3ba86f66f547459582b843e14bc8 */
const APIKey = '&appid=dd6c3ba86f66f547459582b843e14bc8';
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';

// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// begining

const getData = async (baseURL, userZipCode,APIKey) => {
    const fullURL = baseURL+userZipCode+APIKey;
    const response = await fetch(fullURL);
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error: ', error);
    }
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
    const dataRecieved = await fetch('/all');
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
    const userZipCode = document.getElementById('zip').value;
    getData(baseURL, userZipCode,APIKey)
    .then(
        (receivedData)=>{ 
            const userResp = document.getElementById('feelings').value;
            const temp = receivedData.list[0].main.temp;
            const cityName = receivedData.city.name;
            console.log(newDate);
            console.log(temp);
            console.log(userResp);
            console.log(cityName);
            postData ('/dataPost',{cityName:cityName,temp:temp,date:newDate,userResp:userResp})
        }
    )
    .then(
        (receivedData)=>{
            upDateUI(receivedData);
        }
    )
}

export {performAction}


