const BASE_URL = 'https://wttr.in/';
const searchedHistory = {};
let storedHistory = [];

/***
 * getLocation takes in location as the parameter entered by the user,
 * calls another function to display the weather
 * @params (object) event object
 * @params (string) location - takes in the location inputted by the user or if * no location given the api has the ability to detect the location
 * @returns  No return.
 *
 */
const getLocation = async (event, location) => {
  event.preventDefault();

  // let weatherInfo = document.querySelector('.weather');
  // let article = document.querySelector('.three_day_forecast');

  if (location.value === '' || location.value === null) {
    message = 'Error !! Location cannot be empty.Please enter a Location';
    renderError(message);
    return;
  }

  let city = location.value;
  location.value = '';

  const locationUrl = `https://wttr.in/${city}?format=j1`;
  //fetch API data

  fetchLocationWeather(locationUrl, city);
};

/**
 * fetchLocationWeather --fetches the API data and calls the appropriate
 * functions to render the data and to render the user's search history
 * @params (string) url - An endpoint for the api to fetch the data
 * @params (string) city - The location user entered or if no location entered
 * the api returns the weather information of the local city by automatically * sensing the location
 * @modifies the DOM is populated when the renderWeatherData and the
 * renderSearchHistory functions are called
 * @return No return
 *
 */
const fetchLocationWeather = async (url, city) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderWeatherData(data, city);
    const { current_condition } = data;
    const tempFeel = current_condition[0].FeelsLikeF;
    console.log('after weather', city, tempFeel);
    renderSearchHistory(city, tempFeel);
  } catch (error) {
    renderError(error);
  }
};

/**
 * fetchFromPreviousSearch --fetches the API data and calls the appropriate
 * functions to render the data and to render the user's search history
 * @params (string) url - An endpoint for the api to fetch the data
 * @params (string) city - The location user entered or if no location entered
 * the api returns the weather information of the local city by automatically * sensing the location
 * @modifies the DOM is populated when the renderWeatherData and the
 * @returns No return
 *
 */
const fetchFromPreviousSearch = async (url, city) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderWeatherData(data, city);
    const { current_condition } = data;
    const tempFeel = current_condition[0].FeelsLikeF;
    console.log('after weather', city, tempFeel);
  } catch (error) {
    renderError(error);
  }
};
/**
 * renderSearchHistory - a function to display the location the user
 * has searched for already. The user can look at the weather details by
 * clicking the previous location searched. Uses localStorageAPI to preserve
 * the data across browser sessions
 * @param(string) city -the location user enetered
 * @param(string) tempFeel - response string temperatureFeelsLike from the api
 * @modifies(DOM) the function is populating the previous history section
 * @returns - No returns
 */
const renderSearchHistory = (city, tempFeel) => {
  searchedHistory[city] = tempFeel;

  const ul = document.querySelector('.search-history');
  const noSearchMessage = document.querySelector('.noSearch');

  ul.querySelectorAll('*').forEach((node) => {
    node.remove();
  });

  for (const [key, value] of Object.entries(searchedHistory)) {
    const li = document.createElement('li');
    li.style.padding = '0.5rem';
    li.setAttribute('class', 'list-item');
    li.setAttribute('data-key', `${key}`);

    li.innerHTML += `<a class="locationName" href="javascript:void(0)">${key}</a>-${value}`;
    let delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.style.backgroundColor = '#0c7c7e';
    delBtn.style.marginLeft = '0.1rem';
    li.append(delBtn);
    noSearchMessage.classList.add('hidden');
    ul.append(li);

    delBtn.addEventListener('click', (event) => {
      li.remove();
    });
  }

  const searchHistoryList = document.querySelectorAll('.search-history li a');

  Array.from(searchHistoryList).forEach((name) => {
    name.addEventListener('click', function (e) {
      e.preventDefault();
      searchedCity = e.target.innerText;
      const locationUrl = `https://wttr.in/${searchedCity}?format=j1`;
      fetchLocationWeather(locationUrl, searchedCity);
    });
  });
  // let ulList = document.querySelector('aside.previous-history ul');
  // let li = document.createElement('li');
  // li.innerHTML += `<a class="locationName" href="#">${city}</a>-${tempFeel}°F`;
  // const noSearchMessage = document.querySelector('.noSearch');
  // noSearchMessage.classList.add('hidden');
  // let delBtn = document.createElement('button');
  // delBtn.innerText = 'x';
  // delBtn.style.backgroundColor = '#0c7c7e';
  // li.append(delBtn);

  // delBtn.addEventListener('click', (event) => {
  //   li.remove();
  // });
  // ulList.append(li);

  // li.addEventListener('click', function (e) {
  //   e.preventDefault();
  //   const locationUrl = `https://wttr.in/${city}?format=j1`;
  //   fetchFromPreviousSearch(locationUrl, city);
  // });
};

/**
 * getThreeDayForecast - displays the three day weather forecast including the
 * the current day
 * @param(object) apiresponse object
 * @param(article) to update the DOM to display the results of the fetch
 * @modifies(DOM) DOM is populated with the three day forecast weather
 * results
 * @returns - no returns
 */
const getThreeDayForecast = (response, article) => {
  const { weather } = response;

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

  article.innerHTML = '';
  article.classList.remove('hidden');

  weather.forEach(({ avgtempF, maxtempF, mintempF, date }, index) => {
    console.log('average =', avgtempF, maxtempF, mintempF, index);
    article.innerHTML += `<div class="forecast" style="display:block; border:2px solid #0c7c7e;"id="${
      days[index]
    }"><p>${days[index]}<p>${
      daysOfWeek[dateNum + (count % 7)]
    }</p><p>(${date})</p><p>Avg Temp:${avgtempF}</p><p>Max Temp:${maxtempF}</p><p>Min Temp:${mintempF}</p><br></div>`;
    count++;
  });
};

/**
 * renderWeatherData - a function which calculates the chanceofSunshine,
 * chanceofrain, chanceofsnow and displays the appropriate icon if there is a
 * 50% or more of the chance of snow,rain or sunshine and calls
 * threedayforecast function to display the three day forecast
 * @param(object) apiresponse object
 * @param(string) city
 * @@modifies (DOM)by adding location weather and three day forecast
 * @returns - No specific return
 */

const renderWeatherData = (response, city) => {
  const { current_condition, weather, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];

  const val =
    city.toLowerCase() === areaName[0].value.toLowerCase()
      ? 'Area'
      : 'Nearest Area';

  let chanceOfRain = 0,
    chanceOfSnow = 0,
    chanceOfSunshine = 0,
    src = '',
    alt = '';
  let hours = weather[0].hourly;
  let len = weather[0].hourly.length;
  console.log(len);

  chanceOfSunshine =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsunshine));
    }, 0) / len;

  let maxSunshine = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsunshine)
      ? acc
      : (acc = Number(ele.chanceofsunshine));
  }, 0);

  chanceOfSnow =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofsnow));
    }, 0) / len;

  let maxSnow = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofsnow)
      ? acc
      : (acc = Number(ele.chanceofsnow));
  }, 0);

  chanceOfRain =
    hours.reduce((acc, val) => {
      return (acc += Number(val.chanceofrain));
    }, 0) / len;

  let maxRain = hours.reduce((acc, ele) => {
    return acc > Number(ele.chanceofrain)
      ? acc
      : (acc = Number(ele.chanceofrain));
  }, 0);

  const weatherInfo = document.querySelector('.location-data');

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
  console.log(src, alt);
  weatherInfo.innerHTML += `<div class="card" "><img class="icon" src=${src} alt=${alt} /><div class="container" style="display:block;"><h2><strong>${city}</strong></h2><p><strong>${val}: </strong>${
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
 * temperatureConverter - this widget helps the user to convert the weather
 * from celsius or fahrenheit and viceversa
 * @param(event) event object to get the value of the temperature
 * @modifies(DOM) calcuates the temperature of user's selected scale and
 * displays it in the DOM
 * @returns - No returns
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
  console.log(checkedValue);
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

  setTimeout(() => {
    result.style.display = 'none';
  }, 2000);
  result.style.display = 'block';
};

/****
 * renderError- function that renders an error message whenever the app
 * encounters the error
 * @params (string) error message
 * @modifies (string) modifies the DOM with the appropriate error message
 * @returns - no returns
 *
 */
const renderError = (error) => {
  const errorMessage = document.querySelector('.error');

  errorMessage.innerHTML = `<p>${error}</p>`;
  console.log(error);
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 2000);
  errorMessage.style.display = 'block';
};

/**
 * DOMCONTENT LOADED
 * LOAD THE window
 */
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const userInput = document.querySelector('#user-inputs');
  console.log(userInput);
  const submitLocation = document.querySelector('#submit-location');
  const tempForm = document.querySelector('#temperature-input');
  let location = document.querySelector('#location');

  const BASE_URL = 'https://wttr.in/';
  /***
   * User submits the form to find the weather for their desired location
   */
  userInput.addEventListener('submit', (event) => {
    event.preventDefault();

    getLocation(event, location);
  });

  /**
   * user submits the form to convert the temperature from fahrenheit to celsius
   * or viceversa
   */
  tempForm.addEventListener('submit', (event) => {
    event.preventDefault();

    temperatureConverter();
  });

  /***
   * Dark/light theme toggle
   */
  document.getElementById('theme-toggle').addEventListener('click', (e) => {
    const checked = e.target.checked;
    document.body.setAttribute('theme', checked ? 'dark' : 'light');

    document
      .querySelector('header')
      .setAttribute('theme', checked ? 'dark' : 'light');
  });
});
