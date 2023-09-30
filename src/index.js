let apiKey = "58a6775f97527351bf6c6966e209be39";
//display current date time

function forecastTimestamp(weekDay) {
  let dayofWeek = new Date(weekDay * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayofWeek.getDay()];
}

function displayForecast(response) {
  let forecastDay = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastDay.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <img  src="https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="" width="45px">
            <div class="future_prediction">${forecastTimestamp(day.dt)}</div>
            <div class="forecast_temp">
              <span class="max_temp">${Math.round(
                day.temp.max
              )}°</span> <span class="min_temp">${Math.round(
          day.temp.min
        )}°</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let api_key = `0f8bc384a7c31b717a18cfe38a95ae06`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={current,minutely,hourly,alerts}&appid=${api_key}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let cityElement = document.querySelector("#city_name");
  cityElement.innerHTML = response.data.name;
  celciusTemp = Math.round(response.data.main.temp);
  let current_temp = document.querySelector("#temp_now");
  current_temp.innerHTML = celciusTemp;

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

  getForecast(response.data.coord);
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

search("Vienna");
