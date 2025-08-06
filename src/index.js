function showElement(response) {
  let searchCity = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.main.temp;
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let dt = response.data.dt;
  let timezone = response.data.timezone;
  let date = new Date((dt + timezone) * 1000);
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  searchCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src=${iconUrl} class="weather-icon"/>`;
}

function formatDate(date) {
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getUTCDay()];

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  return `${day} ${hour}:${minute}`;
}

function forecastShowElement(response) {
  let forecastList = response.data.list;

  let dailyForecasts = forecastList.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  dailyForecasts.forEach((forecast) => {
    let date = new Date(forecast.dt * 1000);
    let day = date.toLocaleDateString("en-AU", { weekday: "short" });
    let icon = forecast.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let temp = Math.round(forecast.main.temp);

    forecastElement.innerHTML += `
      <div class="forecast-details">
      <div class="forecast-day">${day}</div>
      <img
            src=${iconUrl}
            alt="${forecast.weather[0].description}"
            class="forecast-icon"
          />
      <div class="forecast-temp">${temp}°C</div>
      </div>`;
  });
}

function displayCity(city) {
  let apiKey = "d1193959d2d841ec7555416d715716a6";
  let currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let forecastWeatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  document.querySelector("#loading").style.display = "block";

  axios.get(currentWeatherApiUrl).then(showElement);
  axios
    .get(forecastWeatherApiUrl)
    .then(forecastShowElement)
    .catch(() => {
      alert("City not found. Please check the spelling..");
    })
    .finally(() => (document.querySelector("#loading").style.display = "none"));
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchElementCity = document.querySelector("#search-form");
searchElementCity.addEventListener("submit", searchForCity);

displayCity("Perth");
