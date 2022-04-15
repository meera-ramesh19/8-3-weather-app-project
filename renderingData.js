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
  }<sup>&deg;</sup></p><p><strong>Chance of Sunshine: </strong>${chanceOfSunshine.toFixed(
    0
  )}</p><p><strong>Chance of Rain: </strong>${chanceOfRain.toFixed(
    0
  )}</p><p><strong>Chance of Snow: </strong>${chanceOfSnow.toFixed(
    0
  )}</p></div></div>`;

  const article = document.querySelector('.three_day_forecast');
  getThreeDayForecast(response, article);
};
