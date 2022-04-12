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
  let main = document.querySelectorAll('body *');
  // article.innerHTML = '';
  // weatherInfo.innerHTML = '';
  // console.log(event.target, 'location=', location);

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
const getThreeDayForecast = (response, article) => {
  const { weather } = response;
  console.log(response);
  // const article = document.querySelector('.three_day_forecast');
  article.innerHTML = '';
  const days = ['Today', 'Tomorrow', 'Dayafter'];
  // weather[0].avgtempF, weather[0].maxtempF, weather[0].mintempF;
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

  // const forecastArray = [{
  //   dayDesc:'${days[0]}', dayName:'${daysOfWeek[datenum%7]}',
  // }]
  console.log('dateNum +1 %7 =', dateNum % 7);

  console.log('in 3days =', dateNum, days, daysOfWeek, weather);

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
 *
 * @@modifies (DOM)by adding location weather and three day forecast
 */
const renderWeatherData = (response, city) => {
  const { current_condition, weather, nearest_area } = response;
  const { areaName, region, country } = nearest_area[0];

  const val = city === areaName[0].value ? 'Area' : 'Nearest Area';

  console.log('in renderdata =', val, areaName[0].value, city);
  let chanceOfRain = 0,
    chanceOfSnow = 0,
    chanceOfSunshine = 0;

  weather.forEach((w, index) => {
    chanceOfRain += w.hourly[index].chanceofrain;
    chanceOfSunshine += w.hourly[index].chanceofsunshine;
    chanceOfSnow += w.hourly[index].chanceofsnow;
  });

  chanceOfRain /= weather[0].hourly.length;
  chanceOfSnow /= weather[0].hourly.length;
  chanceOfSunshine /= weather[0].hourly.length;

  const weatherInfo = document.querySelector('.location-data');
  const image = document.createElement('img');

  weatherInfo.innerHTML = '';

  if (chanceOfSunshine > 50) {
    image.src = './assets/icons8-summer.gif';
    image.alt = 'sun';
  } else if (chanceOfRain > 50) {
    image.src = './assets/icons8-torrential-rain.gif';
    image.alt = 'rain';
  } else if (chanceOfSnow > 50) {
    image.src = './assets/icons8-light-snow.gif';
    image.alt = 'snow';
  }
  // image.style.textAlign = 'center';

  // image.style.margin = ' 1rem 0 auto';
  // image.class = 'icon';
  // weatherInfo.append(image);

  // div.innerHTML += '<img src="'+img.src+'" />';
  weatherInfo.innerHTML += `<div class="card"><img class="icon" src=${image.src} alt=${image.alt}/><div class="container"><p><strong>${city}</strong></h2><p><strong>${val}:</strong>${areaName[0].value}</p><p><strong>Region:</strong>${region[0].value}<p><p><strong>Country:</strong>${country[0].value}<p><p><strong>Feels Like:</strong>${current_condition[0].FeelsLikeF}°F</p><p><strong>Chance of Sunshine:</strong>${weather[0].hourly[0].chanceofsunshine}</p><p><strong>Chance of Rain:</strong>${weather[0].hourly[0].chanceofrain}</p><p><strong>Chance of Snow:</strong>${weather[0].hourly[0].chanceofsnow}</p></div></div>`;

  const article = document.querySelector('.three_day_forecast');
  getThreeDayForecast(response, article);
  // setTimeout(() => {
  //  removes element from DOM

  // hides element (still takes up space on page)
  // box.style.visibility = 'hidden';
  // }, 10000);
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
  let celsiusFahrenheitResult = 0;
  let temperatureNotation = '';

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
  error;
};

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const userInput = document.querySelector('#user-inputs');
  console.log(userInput);
  const submitLocation = document.querySelector('#submit-location');
  const tempForm = document.querySelector('#temperature-input');
  let location = document.querySelector('#location');

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
  // const convertBtn = document.querySelector('#conversion-btn');

  // convertBtn.addEventListener('click', temperatureConverter);
});
