let now = new Date();
let date = now.getDate();
let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (minutes === 0) {
  minutes = "00";
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let searchCity = document.querySelector("#searchCity-inputElement");
let currentCity = document.querySelector("#current-city");
let dateDetails = document.querySelector("#current-date");

function refreshWeather(response) {
  console.log(response.data);
  let city = response.data.city;
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#currentDescription");
  let description = response.data.condition.description;
  description = description.toUpperCase();
  let humidityElement = document.querySelector("#currentHumidity");
  let humidity = response.data.temperature.humidity;
  let windspeedElement = document.querySelector("#currentWindspeed");
  let windspeed = response.data.wind.speed;

  temperatureElement.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${city}`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}%`;
  windspeedElement.innerHTML = `${windspeed} Km/h`;

  document.getElementById("iconImage").src = response.data.condition.icon_url;
  document.getElementById("iconImage").alt = response.data.condition.icon;
}

function responseCity(city) {
  let apiKey = `f0c1a84ba5f0b6db3obaf7359402cfct`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  dateDetails.innerHTML = `${day}, ${hours}:${minutes},`;
  responseCity(searchCity.value);
}

let formCity = document.querySelector("#searchCity");
formCity.addEventListener("submit", handleSearchSubmit);

responseCity("Brisbane");
