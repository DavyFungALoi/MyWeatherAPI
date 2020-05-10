const apiKey = "&APPID=93c3061ff1c1e94113e2b27dd8cb1a86";
const apiRequest = "https://api.openweathermap.org/data/2.5/weather?q=";

///"https://api.openweathermap.org/data/2.5/weather?q=Lyon&APPID=93c3061ff1c1e94113e2b27dd8cb1a86",
async function getWeather(searchBarInput) {
  const response = await fetch(apiRequest + searchBarInput + apiKey, {
    mode: "cors",
  });
  const weatherData = await response.json();
  const cityName = weatherData.name;
  const cloudLevelDescription = weatherData.weather[0].description;
  const cloudLevel = weatherData.weather[0].main;
  const windspeed = weatherData.wind.speed;
  const temperature = weatherData.main.temp;
  render(cityName, windspeed, temperature, cloudLevel, cloudLevelDescription);
}

function render(
  cityName,
  windspeed,
  temperature,
  cloudLevel,
  cloudLevelDescription
) {
  renderName(cityName);
  renderWindSpeed(windspeed);
  renderCelcius(temperature);
  renderCloudLevel(cloudLevel);
  renderCloudLevelDescription(cloudLevelDescription);
  renderFahrenheit(temperature)

  ///renderCloudLevelDescription(cloudLevelDescription);
}
function renderCloudLevelDescription(cloudLevelDescription) {
  const cloudDescriptionElement = document.querySelector(".cloud-description");
  cloudLevelDescription = cloudLevelDescription.split(" ");
  for (var i = 0, x = cloudLevelDescription.length; i < x; i++) {
    cloudLevelDescription[i] =
      cloudLevelDescription[i][0].toUpperCase() +
      cloudLevelDescription[i].substr(1);
  }

  const capitalizedString = cloudLevelDescription.join(" ");
  cloudDescriptionElement.innerHTML = capitalizedString;
}

function renderCloudLevel(cloudLevel) {
  const cloudDescriptionElement = document.querySelector(".cloud-level");
  cloudDescriptionElement.innerHTML = cloudLevel;
}

function renderCelcius(temperature) {
  const celcius = temperature - 273.15;
  const celciusElement = document.querySelector(".temperature_celcius");
  celciusElement.innerHTML = celcius.toFixed(2) + '&#8451';
}

function renderName(cityName) {
  const nameElement = document.querySelector(".name");
  nameElement.innerHTML = cityName;
}
function renderWindSpeed(windspeed) {
  const windSpeedElement = document.querySelector(".wind-speed");
  windSpeedElement.innerHTML =`Wind speed: ${windspeed} M/S`
}
function renderFahrenheit(temperature) {
 const fahrenheitElement = document.querySelector(".temperature_fahrenheit")
 const fahrenheit = temperature * 9/5 - 459.67
 fahrenheitElement.innerHTML=fahrenheit.toFixed(2) + '&#8457'
}
function searchCityHandler(searchBarInput) {
  searchBarInput = document.querySelector("#search-bar").value;
  getWeather(searchBarInput).catch((err) => {
    alert("Please fill in a city")
    console.error("hello");
  });
}
function toggleDegreeMetric() {
  const temperatureCelciusDiv =document.querySelector('.temperature_celcius')
  const temperatureFahrenheitDiv =document.querySelector('.temperature_fahrenheit')
  temperatureCelciusDiv.classList.toggle("active");
  temperatureFahrenheitDiv.classList.toggle("active");
  console.log(temperatureFahrenheitDiv.classList)


}
getWeather("London");
