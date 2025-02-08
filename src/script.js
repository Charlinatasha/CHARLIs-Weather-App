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
let formCity = document.querySelector("#searchCity");

function showCurentTemperature(response) {
  console.log(response.data);
  let city = response.data.city;
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  currentCity.innerHTML = `${city}`;
  let currentIcon = document.querySelector("#current-icon");
  let icon = response.data.condition.icon_url;
  if (temperature <= 0) {
    currentIcon.innerHTML = "${icon}";
  }
}

function searchInput(event) {
  event.preventDefault();
  let city = searchCity.value;

  let apiKey = `f0c1a84ba5f0b6db3obaf7359402cfct`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  dateDetails.innerHTML = `${day}, ${hours}:${minutes},`;

  axios.get(apiUrl).then(showCurentTemperature);
}

formCity.addEventListener("submit", searchInput);
