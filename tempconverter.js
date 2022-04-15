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
