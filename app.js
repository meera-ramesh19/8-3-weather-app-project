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

  let city = location.value;
  console.log(city);
  city = city[0].toUpperCase() + city.slice(1);
  //url fpr the fetch
  const locationUrl = `https://wttr.in/${city}?format=j1`;

  //fetch API data
  fetchLocationWeather(locationUrl, city);
};

/**
 * @params (string) url
 *
 *
 * @return (object{}) responsedata
 *
 */
const fetchLocationWeather = async (url, city) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderWeatherData(data, city);
  } catch {
    renderError();
  }
};

/**
 *
 * @param(object) apiresponse object
 *
 * @return
 */
const renderWeatherData = (response, city) => {
  //temp_c,temp_f
  // location = document.querySelector('#location');
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
  const { current_condition, weather, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];
  const weatherInfo = document.querySelector('.weather');

  weatherInfo.innerHTML += `
  <div class="response-data">                                                <img src=${current_condition[0].weatherIconUrl[0].value} alt = ${current_condition[0].weatherDesc[0].value} />
  <h3> <strong>${city}</strong></h3>
  <p><strong>Nearest Area : </strong>${areaName[0].value}</p>
  <p> <strong>Region : </strong>${region[0].value} <p>
  <p> <strong>Country : </strong>${country[0].value} <p>
  <p><strong>Feels Like : </strong>  ${current_condition[0].FeelsLikeF}°F</p>
  <p><strong>Chance of Sunshine : </strong>  ${weather[0].hourly[0].chanceofsunshine}</p>
  <p><strong>Chance of Rain :  </strong> ${weather[0].hourly[0].chanceofrain}</p>
  <p><strong>Chance of Sunshine : </strong> ${weather[0].hourly[0].chanceofsunshine}</p>
  <p><strong>Chance of Snow :  </strong> ${weather[0].hourly[0].chanceofsnow}</p>
       </div>`;
};

/****
 *@params(string) error message
 */

const temperatureConverter = () => {};

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

  temperatureConverter();
});
