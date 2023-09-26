let apiKey = "58a6775f97527351bf6c6966e209be39";
//display current date time

function showTemp(response) {
  let cityElement = document.querySelector("#city_name");
  cityElement.innerHTML = response.data.name;
  celciusTemp = Math.round(response.data.main.temp);
  let current_temp = document.querySelector("#temp_now");
  current_temp.innerHTML = celciusTemp;
  console.log(celciusTemp);

  let humidityElem = document.querySelector("#humidity");
  humidityElem.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElem = document.querySelector("#wind");
  console.log(response.data);
  windElem.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let weatherConditionElem = document.querySelector("#weatherCondition");
  weatherConditionElem.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let current_time = document.querySelector("#current_date");
  current_time.innerHTML = formatDate(response.data.dt * 1000);
}

function formatDate(timestamp) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `Last Updated: ${today} ${hours}:${mins}`;
}
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
//change current city
function changeCityName(event) {
  event.preventDefault();
  let input = document.querySelector("#city_search");
  const str = input.value;
  let result = str.charAt(0).toUpperCase() + str.slice(1);
  search(result);
}

let search_city = document.querySelector("#search_form");
search_city.addEventListener("submit", changeCityName);

function displayFahrenheitTemp(event) {
  event.preventDefault();

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let degree_F = document.querySelector("#temp_now");
  let farhenheit = (celciusTemp * 9) / 5 + 32;
  degree_F.innerHTML = Math.round(farhenheit);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degree_C = document.querySelector("#temp_now");
  degree_C.innerHTML = Math.round(celciusTemp);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  let apiUrl2 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl2).then(showCurrentLocation);
}
function showCurrentLocation(response) {
  let cityName = response.data[0].name;
  console.log(cityName);
  let currentGeolocation = document.querySelector("#city_name");
  currentGeolocation.innerHTML = response.data[0].name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function currPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", currPosition);

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#farenheit_link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius_Link");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Vienna");
