/* Date changing*/

function getDateInfo(dt) {
  let date = new Date(dt);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

function getForecastDay(dt) {
  let date = new Date(dt * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[date.getDay()]}`;
  // return `${days[date.getDay() + i]}`;
}
/* Time changing*/

function getTimeInfo(dt) {
  let date = new Date(dt);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours < 10 ? (hours = `0${hours}`) : hours;
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;

  return `${hours}:${minutes}`;
}

/* Weather Info changing*/

let inputForm = document.querySelector("#form-search");
let currentBtn = document.querySelector("#btn-current");
let weatherInfo = document.querySelector(".weather-info");
let temperature = document.querySelector(".temperature-current");
let temperatureC = document.querySelector(".temperature-c");
let temperatureF = document.querySelector(".temperature-f");
let tempCelsius = null;
let numberOfClickF = 0;
let numberOfClickC = 2;

let apiKey = "e34d0t2732c4955489449b41af8fo3a4";
// let apiKey = "ebef9ca4a8de66ed586fac628fade056";
let apiUrlBase = `https://api.shecodes.io/weather/v1/current?&key=${apiKey}`;
let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?key=${apiKey}`;

// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

function currentPosition(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  apiUrl = `${apiUrlBase}&lon=${currentLong}&lat=${currentLat}`;
  urlForecast = `${apiUrlForecast}&lon=${currentLong}&lat=${currentLat}`;
  // apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&lat=${currentLat}&lon=${currentLong}`;

  axios.get(apiUrl).then(getWeatherInfo);
  axios.get(urlForecast).then(getForecastWeatherInfo);
}

function getWeatherInfo(response) {
  let cityName = document.querySelector(".city-name");
  let countryName = document.querySelector(".weather-info_country");

  let description = document.querySelector(".description_val");
  let wind = document.querySelector(".wind_val");
  let humidity = document.querySelector(".humidity_val");
  let currentDateInfo = document.querySelector(".weather-info_date");
  let currentTimeInfo = document.querySelector(".weather-info_time");
  let weatherIcon = document.querySelector("#icon");

  cityName.innerHTML = `${response.data.city}`;
  // cityName.innerHTML = `${response.data.name}`;
  countryName.innerHTML = `${response.data.country}`;
  // countryName.innerHTML = `${response.data.sys.country}`;

  tempCelsius = response.data.temperature.current;
  temperature.innerHTML = `${Math.round(tempCelsius)}`;
  // temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  description.innerHTML = `${response.data.condition.description}`;
  // description.innerHTML = `${response.data.weather[0].description}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  // wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  // humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  currentDateInfo.innerHTML = getDateInfo(response.data.time * 1000);
  // currentDateInfo.innerHTML = getDateInfo(response.data.dt * 1000);
  currentTimeInfo.innerHTML = getTimeInfo(response.data.time * 1000);
  // currentTimeInfo.innerHTML = getTimeInfo(response.data.dt * 1000);

  weatherIcon.setAttribute("src", `images/${response.data.condition.icon}.svg`);
  weatherIcon.setAttribute("alt", `${response.data.condition.icon}`);
  // weatherIcon.setAttribute(
  //   "src",
  //   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  // );
}

function getForecastWeatherInfo(response) {
  let weatherWeek = document.querySelector(".weather-week");
  let responseArr = response.data.daily;
  let weatherWeekHTML = "";

  responseArr.forEach(function (item, index) {
    if (index > 0) {
      weatherWeekHTML += `<div class="row">
      <div class="col-4 d-flex align-items-center day-name">
        ${getForecastDay(item.time)}
      </div>
      <div class="col-2">
        <img src="images/${item.condition.icon}.svg" alt="${
        item.condition.icon
      }" />
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        ${Math.round(item.temperature.maximum)}°
      </div>
      <div class="col d-flex align-items-center">${Math.round(
        item.temperature.minimum
      )}°
      </div>
    </div>`;
    }
  });

  weatherWeek.innerHTML = weatherWeekHTML;
}

function inputFormSubmit(event) {
  event.preventDefault();

  let city = document.querySelector(".form-control");
  let newCityToSeatch = city.value[0].toLowerCase();
  for (let i = 1; i < city.value.length; i++) {
    newCityToSeatch += city.value[i].toLowerCase();
  }
  apiUrl = `${apiUrlBase}&query=${newCityToSeatch}`;
  urlForecast = `${apiUrlForecast}&query=${newCityToSeatch}`;

  // apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${newCityToSeatch}`;

  axios.get(apiUrl).then(getWeatherInfo);
  axios.get(urlForecast).then(getForecastWeatherInfo);

  city.value = "";
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

navigator.geolocation.getCurrentPosition(currentPosition);
inputForm.addEventListener("submit", inputFormSubmit);
currentBtn.addEventListener("click", getCurrentLocation);

/* Units changing*/

function onTemperatureFClick() {
  temperatureF.classList.add("active");
  temperatureC.classList.remove("active");
  let tempFahrenheit = Math.round(tempCelsius * 1.8 + 32);
  temperature.innerHTML = `${tempFahrenheit}`;
}

function onTemperatureCClick() {
  temperatureC.classList.add("active");
  temperatureF.classList.remove("active");
  temperature.innerHTML = `${Math.round(tempCelsius)}`;
}

temperatureF.addEventListener("click", onTemperatureFClick);
temperatureC.addEventListener("click", onTemperatureCClick);
