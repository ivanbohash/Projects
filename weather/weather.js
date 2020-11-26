var loc = document.getElementById('location');
var temp = document.getElementById('temperature');
var feelsLike = document.getElementById('feels');
var wind = document.getElementById('winds');
var pres = document.getElementById('pressure');
var cloud = document.getElementById('clouds');
var feelsPar = document.querySelector('.feels-par');
var cloudPar = document.querySelector('.cloud-par');
var windPar = document.querySelector('.wind-par');
var presPar = document.querySelector('.pres-par');
var getWeatherBtn = document.getElementById('getWeather');
var cityNameInput = document.getElementById('cityName');
var getWeatherByNameBtn = document.getElementById('getWeatherByName');

function kToC(k) {
  return Math.round(k - 273.15);
} 

// for current position
function getLocationCoords() {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function (position) {
    getWeatherData(position.coords.latitude, position.coords.longitude);
   });
  } else {
   alert('Your browser does not support Navigator Geolocation API');
  }
}
 
function getWeatherData(latitude, longitude) {
  fetch(
   'https://api.openweathermap.org/data/2.5/weather?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&appid=' +
    '8b0981680db997609ce554713a08c1aa'
  )
   .then(function (response) {
    return response.json();
   })
   .then(function (data) {
    displayWeatherData(data);
   });
}
 
function displayWeatherData(data) {
  console.log(data.weather[0].description);
  temp.innerText = kToC(data.main.temp) + '°' +'c';
  feelsPar.innerText = 'Feels like';
  feelsLike.innerText = kToC(data.main.feels_like) + '°' +'c';
  cloudPar.innerText = 'Clouds';
  cloud.innerText = data.weather[0].description;
  loc.innerText = data.name + ', ' + data.sys.country;
  windPar.innerText = 'Wind';
  wind.innerText = data.wind.speed + ' m/s, ' + data.wind.deg + '°';
  presPar.innerText = 'Pressure';
  pres.innerText = data.main.pressure + ' hPa';
} 

getWeatherBtn.addEventListener('click', getLocationCoords);

// for city weather
function inputCity() {
    var input = cityNameInput.value;
    getCityName(input);
    cityNameInput.value = '';
}

function getCityName(input) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + '8b0981680db997609ce554713a08c1aa')
    .then(function (response) {
      return response.json();
     })
     .then(function (data) {
      displayWeatherData(data);      
     });
}

getWeatherByNameBtn.addEventListener('click', inputCity);
cityNameInput.addEventListener('keyup', function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    getWeatherByNameBtn.click();
  }
})
