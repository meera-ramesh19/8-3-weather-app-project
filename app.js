const BASE_URL = 'https://wttr.in/';
const searchedHistory = {};
let storedHistory = [];
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

  let city = location.value;
  // city = city[0].toUpperCase() + city.slice(1);
  location.value = '';

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
    const { current_condition } = data;
    const tempFeel = current_condition[0].FeelsLikeF;
    renderSearchHistory(city, tempFeel);
  } catch {
    renderError();
  }
  // return data;
};

/**
 *
 * @param(object) apiresponse object
 * @param(string) city
 * @modifies(DOM) the side effect is populating the previous history section
 *
 */

const renderSearchHistory = (city, tempFeel) => {
  // const { current_condition, areaName } = responseObj;

  // searchedHistory[city] = current_condition[0].FeelsLikeF;
  searchedHistory[city] = tempFeel;

  storedHistory.push(searchedHistory);

  // window.localStorage.setItem('storedHistory', JSON.stringify(storedHistory));
  // console.log(localStorage);

  const ul = document.querySelector('.search-history');

  const noSearchMessage = document.querySelector('.noSearch');

  ul.querySelectorAll('*').forEach((node) => {
    node.remove();
  });

  for (const [key, value] of Object.entries(searchedHistory)) {
    noSearchMessage.classList.add('hidden');

    const li = document.createElement('li');
    li.style.padding = '0.5rem';
    li.setAttribute('class', 'list-item');
    li.setAttribute('data-key', `${key}`);
    li.innerHTML += `<a class="locationName" href="javascript:void(0)">${key}</a><span>-${value}</span> `;
    // <i class="fa-solid fa-trash fa-2xl" style="width:auto;height:auto"></i>
    // ul.append(li);
    const item = document.querySelector(`[data-key='${key}']`);
    if (item) {
      ul.replaceChild(li, item);
    } else {
      ul.append(li);
    }
  }
  console.log(searchedHistory);
  const searchHistoryList = document.querySelectorAll('.search-history li');

  Array.from(searchHistoryList).forEach((name) => {
    name.addEventListener('click', function (e) {
      e.preventDefault();
      searchedCity = e.target.innerText;
      const locationUrl = `https://wttr.in/${searchedCity}?format=j1`;
      fetchLocationWeather(locationUrl, searchedCity);
    });
  });
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
    }"><p>${days[index]}<p>${
      daysOfWeek[dateNum + (count % 7)]
    }</p><p>(${date})</p><p>Avg Temp:${avgtempF}</p><p>Max Temp:${maxtempF}</p><p>Min Temp:${mintempF}</p><button class="three_hour">Hourly</button></div>`;
    count++;
  });

  const threeHourBtn = document.querySelector('.three_hour');
  threeHourBtn.addEventListener('click', (event) => {
    console.log(event.target, ' weather=', weather);
    renderhourlyWeather(weather);
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

  // const val = city === areaName[0].value ? 'Area' : 'Nearest Area';
  console.log(response);
  let chanceOfRain = 0,
    chanceOfSnow = 0,
    chanceOfSunshine = 0,
    src = '',
    alt = '';
  let hours = weather[0].hourly;

  chanceOfSunshine =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsunshine));
    }, 0) / 8;

  let maxSunshine = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsunshine)
      ? acc
      : (acc = Number(ele.chanceofsunshine));
  }, 0);

  chanceOfSnow =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsnow));
    }, 0) / 8;

  let maxSnow = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsnow)
      ? acc
      : (acc = Number(ele.chanceofsnow));
  }, 0);

  chanceOfRain =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofrain));
    }, 0) / 8;

  let maxRain = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofrain)
      ? acc
      : (acc = Number(ele.chanceofrain));
  }, 0);

  const weatherInfo = document.querySelector('.location-data');
  // const image = document.createElement('img');

  weatherInfo.innerHTML = '';

  if (maxSunshine > 50) {
    src = './assets/icons8-summer.gif';
    alt = 'sun';
  } else if (maxRain > 50) {
    src = './assets/icons8-torrential-rain.gif';
    alt = 'rain';
  } else if (maxSnow > 50) {
    src = './assets/icons8-light-snow.gif';
    alt = 'snow';
  }
  // image.style.textAlign = 'center';

  // image.style.margin = ' 1rem 0 auto';
  // image.class = 'icon';
  // weatherInfo.append(image);

  weatherInfo.innerHTML += `<div class="card"><img class="icon" src=${src} alt=${alt}><br><div class="container"><h2 class="city"><strong>${city}</strong></h2><p><strong>Nearest Area: </strong>${
    areaName[0].value
  }</p><p><strong>Region: </strong>${
    region[0].value
  }</p><p><strong>Country: </strong>${
    country[0].value
  }</p><p><strong>Feels Like: </strong>${
    current_condition[0].FeelsLikeF
  }<sup>&deg;</sup></p><p><strong>Chance of Sunshine: </strong>{chanceOfSunshine.toFixed(0)}</p><p><strong>Chance of Rain: </strong>${chanceOfRain.toFixed(
    0
  )}</p><p><strong>Chance of Snow: </strong>${chanceOfSnow.toFixed(
    0
  )}</p></div></div>`;

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
  let celsiusFahrenheitResult = 0;
  let temperatureNotation = '';

  if (temperatureInput.value === '' || temperatureInput.value === null) {
    message = 'Temperature cannot be empty !!! Please enter a number';
    renderError(message);
    return;
  }
  let temptoConvert = Number(temperatureInput.value);

  const checkedButton = document.querySelector(
    'input[name="convert"]:checked '
  );
  let checkedValue = checkedButton.value;

  result.innerHTMl = '';
  temperatureInput.value = '';

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

  // setTimeout(() => {
  //   result.style.display = 'none';
  // }, 30000);
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

  // const reference = localStorage.getItem('storedHistory');

  // if (reference) {
  //   storedHistory = JSON.parse(reference);
  //   storedHistory.forEach((obj) => {
  //     console.log(obj);
  //     Object.entries(obj).forEach(([key, value]) => {
  //       console.log(key, value);
  //       renderSearchHistory(key, value);
  //     });
  //   });
  // }

  // submitLocation.addEventListener('click', getlocation);
  userInput.addEventListener('submit', (event) => {
    event.preventDefault();

    getLocation(event, location);
  });
  tempForm.addEventListener('submit', (event) => {
    event.preventDefault();

    temperatureConverter();
  });
});

// #efdecd-almond Color
// #edc9af
