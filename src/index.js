function showElement(response) {
  let searchCity = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.list[0].main.temp;

  searchCity.innerHTML = response.data.city.name;
  temperatureElement.innerHTML = Math.round(temperature);

  console.log(response.data);
}

function displayCity(city) {
  let apiKey = "d1193959d2d841ec7555416d715716a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showElement);
}

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  displayCity(searchInput.value);
}

let searchElementCity = document.querySelector("#search-form");
searchElementCity.addEventListener("submit", searchForCity);
