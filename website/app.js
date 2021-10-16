/* Global Variables */
// Create a new date instance dynamically with JS
let newDate =  new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+ new Date().getFullYear();
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=54af82148dee1afd8bb7886825ebb207&units=metric';
const port = 8000;
const zip = document.getElementById('zip');
const btn = document.getElementById('generate');

const getWeather = async (baseURL,zip,apiKey)=>{
  const res = await fetch(baseURL+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error",e);
  }
}

btn.addEventListener('click',(e)=>{
  const zipCode = zip.value;
  const feel = document.getElementById('feelings').value;
  getWeather(baseURL,zipCode,apiKey).then(function(data){
    postData('/feel',{temprature: data.main.temp, date: newDate, feelings: feel});
    showUser();
  });
});



const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch (e) {
      console.log('error',e);
    }
}

const showUser = async _=>{
  const req = await fetch('/all');
  try {
    const data = await req.json();
    const temp = Math.round(data.temprature);
    document.getElementById('date').innerHTML = `Date : ${data.date}`;
    document.getElementById('temp').innerHTML = `Temptature : ${temp}&degC`
    document.getElementById('content').innerHTML =  `I'm feeling ${data.feelings}`
  } catch (e) {
    console.log('error',e);
  }
}
