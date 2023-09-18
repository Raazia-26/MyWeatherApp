let apiKey = "58a6775f97527351bf6c6966e209be39";
//display current date time
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
let mins = now.getMinutes();
let time = `${hours}:${mins}`;

let current_time = document.querySelector("#current_date");
current_time.innerHTML = `${today} ${time}`;

function showTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  console.log(cityTemp);
  let degreeC = document.querySelector("#temp_now");
  degreeC.innerHTML = `${cityTemp}`;
}

//change current city
function changeCityName(event) {
  event.preventDefault();

  let input = document.querySelector("#city_search");
  const str = input.value;
  let result = str.charAt(0).toUpperCase() + str.slice(1);
  let city = document.querySelector("#city_name");
  city.innerHTML = `${result}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let search_city = document.querySelector("#search_form");

search_city.addEventListener("submit", changeCityName);

//farenheit and celcius tempertaure change

/*function tempF() {
  let C = degreeC;
  let F = Math.round((C * 9) / 5 + 32);
  let degreeF = document.querySelector("#temp_now");
  degreeF.innerHTML = `${F}°`;
}

let farenheit = document.querySelector("#degree_f");
farenheit.addEventListener("click", tempF);

*/
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
