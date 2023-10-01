//---------------- HW-4 ----------------------

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

/* Time changing*/

function getTimeInfo(dt) {
  let date = new Date(dt);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours < 10 ? (hours = `0${hours}`) : hours;
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;

  return `${hours}:${minutes}`;
}

//---------------- HW-5 ----------------------

let inputForm = document.querySelector("#form-search");
let currentBtn = document.querySelector("#btn-current");
let temperatureC = document.querySelector(".temperature-c");
let temperatureF = document.querySelector(".temperature-f");
let numberOfClickF = 0;
let numberOfClickC = 2;

let apiKey = "e34d0t2732c4955489449b41af8fo3a4";
// let apiKey = "ebef9ca4a8de66ed586fac628fade056";
let apiUrl = `https://api.shecodes.io/weather/v1/current?&key=${apiKey}`;
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

function currentPosition(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${currentLong}&lat=${currentLat}&key=${apiKey}`;
  // apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&lat=${currentLat}&lon=${currentLong}`;

  axios.get(apiUrl).then(getWeatherInfo);
}

function getWeatherInfo(response) {
  let cityName = document.querySelector(".city-name");
  let countryName = document.querySelector(".weather-info_country");
  let temperature = document.querySelector(".temperature-current");
  let temperatureFeeling = document.querySelector(".temperature");
  // let temperatureDay = document.querySelector(".temperature-day");
  // let temperatureNight = document.querySelector(".temperature-night");
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
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
  // temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  description.innerHTML = `${response.data.condition.description}`;
  // description.innerHTML = `${response.data.weather[0].description}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  // wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  // humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  response.data.temperature.feels_like > 0
    ? (temperatureFeeling.innerHTML = `Fells like +${Math.round(
        response.data.temperature.feels_like
      )}°`)
    : (temperatureFeeling.innerHTML = `Fells like: ${Math.round(
        response.data.temperature.feels_like
      )}°`);

  // response.data.main.temp_max > 0
  //   ? (temperatureDay.innerHTML = `+${Math.round(response.data.main.temp_max)}`)
  //   : (temperatureDay.innerHTML = `${Math.round(response.data.main.temp_max)}`);

  // response.data.main.temp_min > 0
  //   ? (temperatureNight.innerHTML = `+${Math.round(
  //       response.data.main.temp_min
  //     )}`)
  //   : (temperatureNight.innerHTML = `${Math.round(
  //       response.data.main.temp_min
  //     )}`);

  currentDateInfo.innerHTML = getDateInfo(response.data.time * 1000);
  // currentDateInfo.innerHTML = getDateInfo(response.data.dt * 1000);
  currentTimeInfo.innerHTML = getTimeInfo(response.data.time * 1000);
  // currentTimeInfo.innerHTML = getTimeInfo(response.data.dt * 1000);

  weatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  weatherIcon.setAttribute("alt", `${response.data.condition.icon}`);
  // weatherIcon.setAttribute(
  //   "src",
  //   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  // );
}

function inputFormSubmit(event) {
  event.preventDefault();

  let city = document.querySelector(".form-control");
  let newCityToSeatch = city.value[0].toUpperCase();
  for (let i = 1; i < city.value.length; i++) {
    newCityToSeatch += city.value[i].toLowerCase();
  }
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCityToSeatch}&key=${apiKey}`;
  // apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${newCityToSeatch}`;

  city.value = "";
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

navigator.geolocation.getCurrentPosition(currentPosition);
inputForm.addEventListener("submit", inputFormSubmit);
currentBtn.addEventListener("click", getCurrentLocation);

/* Units changing*/

// function onTemperatureFClick() {
//   numberOfClickF += 1;
//   numberOfClickC = 0;
//   if (numberOfClickF > 1) {
//     return;
//   }

//   let currentValue = Number(temperature.textContent);
//   let currentValueNew = Math.round(currentValue * 1.8 + 32);

//   let currentDayValue = Number(temperatureDay.textContent);
//   let currentDayValueNew = Math.round(currentDayValue * 1.8 + 32);

//   let currentNightValue = Number(temperatureNight.textContent);
//   let currentNightValueNew = Math.round(currentNightValue * 1.8 + 32);

//   temperature.innerHTML = `${currentValueNew}`;
//   temperatureDay.innerHTML = `${currentDayValueNew}`;
//   temperatureNight.innerHTML = `${currentNightValueNew}`;
// }

// function onTemperatureCClick() {
//   numberOfClickF = 0;
//   numberOfClickC += 1;
//   if (numberOfClickC > 1) {
//     return;
//   }

//   let currentValue = Number(temperature.textContent);
//   let currentValueNew = Math.round((currentValue - 32) / 1.8);

//   let currentDayValue = Number(temperatureDay.textContent);
//   let currentDayValueNew = Math.round((currentDayValue - 32) / 1.8);

//   let currentNightValue = Number(temperatureNight.textContent);
//   let currentNightValueNew = Math.round((currentNightValue - 32) / 1.8);

//   temperature.innerHTML = `${currentValueNew}`;
//   temperatureDay.innerHTML = `${currentDayValueNew}`;
//   temperatureNight.innerHTML = `${currentNightValueNew}`;
// }

// temperatureF.addEventListener("click", onTemperatureFClick);
// temperatureC.addEventListener("click", onTemperatureCClick);
