const BASE_URL = 'https://wttr.in/';
/***
 *
 * @params (object) event
 *
 *
 */
const getLocation = (event) => {
  event.preventDefault();
  let location = document.querySelector('#location');
  console.log(event.target);
  location = location.value;
  console.log(location);
  location = location[0].toUpperCase() + location.slice(1);
  //url fpr the fetch
  const locationUrl = `https://wttr.in/${location}?format=j1`;
  //fetch API data
  fetchLocationWeather(locationUrl);
};

/**
 * @params (string) url
 *
 *
 * @return (object{}) responsedata
 *
 */
const fetchLocationWeather = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then(renderWeatherData)
    .catch(renderError);
};

/**
 *
 * @param(object) apiresponse object
 *
 * @return
 */
const renderWeatherData = (response) => {
  //temp_c,temp_f

  console.log(
    'in weather data',
    response,
    response.current_condition[0].FeelsLikeC,
    response.current_condition[0].FeelsLikeF,
    response.current_condition[0].cloudcover,
    response.current_condition[0].humidity,
    response.current_condition[0].observation_time,
    response.current_condition[0].uvIndex,
    response.current_condition[0].weatherCode,
    response.current_condition[0].weatherDesc[0].value,
    response.current_condition[0].weatherIconUrl[0].value,
    response.request[0].query,
    response.nearest_area[0].areaName[0].value,
    response.nearest_area[0].country[0].value,
    response.weather[0].astronomy[0].sunrise,
    response.weather[0].astronomy[0].sunset,
    response.weather[0].hourly[0].DewPointC,
    response.weather[0].hourly[0].DewPointF,
    response.weather[0].hourly[0].chanceofrain,
    response.weather[0].hourly[0].chanceofsunshine,
    response.weather[0].hourly[0].chanceofsnow,
    response.weather[0].maxtempC,
    response.weather[0].maxtempF,
    response.weather[0].mintempC,
    response.weather[0].mintempF,
    response.weather[0].avgtempC,
    response.weather[0].avgtempF,
    response.weather[0].date,
    response.weather[0].totalSnow_cm
  );
  const { current_condition, request, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];

  console.log(areaName, region, country);
};

/****
 *@params(string) error message
 */
const renderError = (error) => {
  console.log(error);
};
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const userInput = document.getElementById('user-inputs');
  const submitLocation = document.querySelector('#submit-location');

  submitLocation.addEventListener('click', getLocation);
});
