const BASE_URL = 'https://wttr.in/';
const iconImage = '';
const iconAltText = '';
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
  location.value = '';
  console.log(city);
  city = city[0].toUpperCase() + city.slice(1);

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
const getThreeDayForecast = (response) => {
  const { weather } = response;

  const today = weather[0].date;
  const tomorrow = weather[1].date;
  const dayafter = weather[2].date;
  weather[0].avgtempF,weather[0].maxtempF,weather[0].mintempF
  const daysOfWeek = ['Sunday ', 'Monday ', 'Tueday ', 'Wednesday ', 'Thursday ', 'Friday', 'Saturday'];
  const dateNow = new Date();
  let dateNum = dateNow.getDay();

  today
};
/**
 *
 * @param(object) apiresponse object
 *
 * @return
 */
const renderWeatherData = (response, city) => {
  const { current_condition, weather, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];

  console.log(weather);

  const chanceofrain = weather[0].hourly[0].chanceofrain;
  const chanceofsunshine = weather[0].hourly[0].chanceofsunshine;
  const chanceofsnow = weather[0].hourly[0].chanceofsnow;
  const weatherInfo = document.querySelector('.location-data');
  const image = document.createElement('img');

  weatherInfo.innerHTML = '';

  if (chanceofsunshine > 50) {
    image.src = './assets/icons8-summer.gif';
    image.alt = 'sun';
  } else if (chanceofrain > 50) {
    image.src = './assets/icons8-torrential-rain.gif';
    image.alt = 'rain';
  } else if (chanceofsnow > 50) {
    image.src = './assets/icons8-light-snow.gif';
    image.alt = 'snow';
  }
  image.style.textAlign = 'center';
  weatherInfo.append(image);

  // div.innerHTML += '<img src="'+img.src+'" />';
  weatherInfo.innerHTML += `<br><strong>${city}</strong></h2><p><strong>Nearest Area:</strong>${areaName[0].value}</p><p> <strong>Region:</strong>${region[0].value}<p><p><strong>Country:</strong>${country[0].value}<p><p><strong>Feels Like:</strong>${current_condition[0].FeelsLikeF}°F</p><p><strong>Chance of Sunshine:</strong>${weather[0].hourly[0].chanceofsunshine}</p><p><strong>Chance of Rain:</strong>${weather[0].hourly[0].chanceofrain}</p><p><strong>Chance of Snow:</strong>${weather[0].hourly[0].chanceofsnow}</p>`;

  getThreeDayForecast(response);
};

/****
 *@params(event)
 */
const temperatureConverter = (event) => {
  let temperatureInput = document.querySelector('#temperature');
  const result = document.querySelector('.result');

  const checkedButton = document.querySelector(
    'input[name="convert"]:checked '
  );

  let checkedValue = checkedButton.value;
  let temptoConvert = Number(temperatureInput.value);
  console.log(typeof temptoConvert, temptoConvert);
  result.innerHTMl = '';
  temperatureInput.value = '';
  let celsiusFahrenheitResult = 0;
  let temperatureNotation = '';
  // let errorMessage = false;

  if (checkedValue === 'celsius') {
    celsiusFahrenheitResult = (temptoConvert - 32) / 1.8;
    temperatureNotation = 'C';
  } else {
    celsiusFahrenheitResult = temptoConvert * 1.8 + 32;
    temperatureNotation = 'F';
  }

  result.innerHTML = `Temperature is:${celsiusFahrenheitResult.toFixed(
    2
  )}<sup>&deg;</sup>${temperatureNotation}`;
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

  const tempForm = document.querySelector('#temperature-input');

  tempForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target);

    temperatureConverter();
  });
  // const convertBtn = document.querySelector('#conversion-btn');

  // convertBtn.addEventListener('click', temperatureConverter);
});
