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
