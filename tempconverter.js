/****
 * @param(event) event object to get the value of the temperature
 * @modifies(DOM) calcuates the temperature of user's selected scale and
 * displays it in the DOM
 */
const temperatureConverter = (event) => {
  let temperatureInput = document.querySelector('#temperature');
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
    result.style.display = 'none';
  }, 30000);
};
