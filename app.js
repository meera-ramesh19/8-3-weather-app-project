const BASE_URL = 'https://wttr.in/';
const iconImage = '';
const iconAltText = '';
/***
 *
 * @params (object) event
 *
 *
 */
const getLocation = (event, location) => {
  event.preventDefault();

  // let location = document.querySelector('#location');
  let weatherInfo = document.querySelector('.weather');
  let article = document.querySelector('.three_day_forecast');

  if (location.value === '' || location.value === null) {
    message = 'Error !! Location cannot be empty.Please enter a Location';
    renderError(message);
    return;
  }
  // article.innerHTML = '';
  // weatherInfo.innerHTML = '';
  // console.log(event.target, 'location=', location);

  let city = location.value;

  location.value = '';
  console.log(city);
  // city = city[0].toUpperCase() + city.slice(1);

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
const fetchLocationWeather = async (url, city, image) => {
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
 * @param(article) to update the DOM to display the results of the fetch
 * @modifies(DOM) the side effect is the modification of the DOM with the
 * results
 */

const getThreeDayForecast = (response, article) => {
  const { weather } = response;
  // console.log(response);
  // const article = document.querySelector('.three_day_forecast');
  article.innerHTML = '';
  const days = ['Today', 'Tomorrow', 'Dayafter'];
  const daysOfWeek = [
    'Sunday ',
    'Monday ',
    'Tuesday ',
    'Wednesday ',
    'Thursday ',
    'Friday',
    'Saturday',
  ];
  const dateNow = new Date();
  let count = 0,
    dateNum = dateNow.getDay();

  weather.forEach(({ avgtempF, maxtempF, mintempF, date }, index) => {
    console.log('average =', avgtempF, maxtempF, mintempF, index);
    article.innerHTML += `<div class="forecast" style="display:block;"id="${
      days[index]
    }"><p>${days[index]}<p>${daysOfWeek[dateNum + (count % 7)]}</p><p>
    (${date})</p><p>Avg Temp:${avgtempF}</p><p>Max Temp:${maxtempF}</p><p>Min Temp:${mintempF}</p></div>`;
    count++;
  });
};

/**
 *
 * @param(object) apiresponse object
 *  @param(string) city
 * @@modifies (DOM)by adding location weather and three day forecast
 */

const renderWeatherData = (response, city) => {
  const { current_condition, weather, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];

  const val = city === areaName[0].value ? 'Area' : 'Nearest Area';
  console.log(val);

  console.log(response);

  let chanceOfRain = 0,
    chanceOfSnow = 0,
    chanceOfSunshine = 0,
    src = '',
    alt = '';

  let hours = weather[0].hourly;
  console.log(hours);

  chanceOfSunshine =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsunshine));
    }, 0) / 8;

  let highestSunshineVal = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsunshine)
      ? acc
      : (acc = Number(ele.chanceofsunshine));
  }, 0);

  // const filteredSunshine = hours.filter(
  //   (ele) => Number(ele.chanceofsunshine) > 50
  // )[0].chanceofsunshine;

  // const sunshine =
  //   filteredSunshine > chanceOfSunshine ? filteredSunshine : chanceOfSunshine;

  // console.log('s=', sunshine, 'f=', filteredSunshine);

  chanceOfSnow =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsnow));
    }, 0) / 8;

  let highestSnowVal = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsnow)
      ? acc
      : (acc = Number(ele.chanceofsnow));
  }, 0);

  // const filteredSnow = hours.filter((ele) => Number(ele.chanceofsnow) > 50)[0]
  //   .chanceofsnow;

  // const snow = filteredSnow > chanceOfSnow ? filteredSnow : chanceOfSnow;
  // console.log('ss=', snow, 'fs=', filteredSnow);

  chanceOfRain =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofrain));
    }, 0) / 8;

  let highestRainVal = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofrain)
      ? acc
      : (acc = Number(ele.chanceofrain));
  }, 0);

  // const filteredRain = hours.filter((ele) => Number(ele.chanceofrain) > 50)[0]
  //   .chanceofrain;

  // const rain = filteredRain > chanceOfRain ? filteredRain : chanceOfRain;
  // console.log('sr=', rain, 'fr=', filteredRain);

  const weatherInfo = document.querySelector('.location-data');
  // const image = document.createElement('img');

  weatherInfo.innerHTML = '';

  if (highestSunshineVal > 50) {
    src = './assets/icons8-summer.gif';
    alt = 'sun';
  } else if (highestRainVal > 50) {
    src = './assets/icons8-torrential-rain.gif';
    alt = 'rain';
  } else if (highestSnowVal > 50) {
    src = './assets/icons8-light-snow.gif';
    alt = 'snow';
  }
  // image.style.textAlign = 'center';

  // image.style.margin = ' 1rem 0 auto';
  // image.class = 'icon';
  // weatherInfo.append(image);

  // div.innerHTML += '<img src="'+img.src+'" />';
  weatherInfo.innerHTML += `<div class="card"><img class="icon" src=${src} alt=${alt} /><div class="container"><h2><strong>${city}</strong></h2><p><strong>${val}: </strong>${
    areaName[0].value
  }</p><p><strong>Region: </strong>${
    region[0].value
  }<p><p><strong>Country: </strong>${
    country[0].value
  }<p><p><strong>Feels Like: </strong>${
    current_condition[0].FeelsLikeF
  }<sup>&deg;</sup></p><p><strong>Chance of Sunshine: </strong>${chanceOfSunshine.toFixed(
    0
  )}</p><p><strong>Chance of Rain: </strong>${chanceOfRain.toFixed(
    0
  )}</p><p><strong>Chance of Snow: </strong>${chanceOfSnow.toFixed(
    0
  )}</p></div>`;

  const article = document.querySelector('.three_day_forecast');
  getThreeDayForecast(response, article);
};

/****
 * @param(event) event object to get the value of the temperature
 * @modifies(DOM) calcuates the temperature of user's selected scale and
 * displays it in the DOM
 */
const temperatureConverter = (event) => {
  let temperatureInput = document.querySelector('#temp-to-convert');
  const result = document.querySelector('.result');

  if (temperatureInput.value === '' || temperatureInput.value === null) {
    message = 'Temperature cannot be empty !!! Please enter a number';
    renderError(message);
    return;
  }

  let temptoConvert = Number(temperatureInput.value);
  let celsiusFahrenheitResult = 0;
  let temperatureNotation = '';

  const checkedButton = document.querySelector(
    'input[name="convert"]:checked '
  );
  let checkedValue = checkedButton.value;

  // console.log(typeof temptoConvert, temptoConvert);
  result.innerHTMl = '';
  temperatureInput.value = '';

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

  setTimeout(() => {
    //  removes element from DOM
    result.style.display = 'none';
  }, 30000);
};

/****
 *@params(string) error message
 *
 */
const renderError = (error) => {
  const errorMessage = document.querySelector('.error');

  errorMessage.innerHTML = `<p>${error}</p>`;
  console.log(error);
  setTimeout(() => {
    //  removes element from DOM
    errorMessage.style.display = 'none';
  }, 3000);
};

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const userInput = document.querySelector('#user-inputs');
  console.log(userInput);
  const submitLocation = document.querySelector('#submit-location');
  const tempForm = document.querySelector('#temperature-input');
  let location = document.querySelector('#location');
  const image = document.createElement('img');
  // submitLocation.addEventListener('click', getlocation);
  userInput.addEventListener('submit', (event) => {
    // console.log(event.target);

    getLocation(event, location);
  });
  tempForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(event.target);
    temperatureConverter();
  });
});
