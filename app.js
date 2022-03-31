
// Elements Query

const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.icon');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const locationElement = document.querySelector('.location');



// App data
const weather = {};
weather.temperature = {
  unit: 'celsius'
}

// App Const and api key

const kelvin = 273
const key = '47cea4185fa9a15a371d5ef303cac84e';

// checking browser supports geolocation

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = 'block'
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>"
}

// set user position

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}



// show error when there is an issue with geolocation

function showError(error){
  notificationElement.style.display = 'block'
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

// get weather from api 


function getWeather(latitude, longitude){
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

  fetch(api)
  .then((response) => response.json())
  .then(function(data){
    console.log(data)
    weather.temperature.value = Math.floor(data.main.temp-kelvin);
    weather.descrition = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
    displayWeather();
  })
}

// Display Weather to ui


function displayWeather() {
iconElement.innerHTML = `<img src = 'icons/${weather.iconId}.png>`;
temperatureElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
descriptionElement.innerHTML = `${weather.description}`;
locationElement.innerHTML = `${weather.city}, ${weather.country}`

}






