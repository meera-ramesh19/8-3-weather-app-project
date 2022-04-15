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
