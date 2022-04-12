/***
 *
 * @params (object) event
 * @params (location) event
 *
 */
const getLocation = (event, location) => {
  event.preventDefault();

  // let location = document.querySelector('#location');
  let weatherInfo = document.querySelector('.weather');
  let article = document.querySelector('.three_day_forecast');

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
 * @params(string) city
 * @output
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
