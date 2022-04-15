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
