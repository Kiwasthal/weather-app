let userInput = document.querySelector('.form__field');
import {
  loadingAnimationEnd,
  loadingAnimationStart,
  createDOMdisplay,
} from './displayControl';

async function getWeatherData() {
  if (userInput.value == '') return;
  loadingAnimationStart();
  const inputCity = normalizeInput(userInput.value);
  try {
    document.querySelector('.error').textContent = '';
    const requestCoordinates = createRequestCoordinates(inputCity);
    const coordinates = await fetchCoordinates(requestCoordinates);
    const forecast = createWeatherForcast(coordinates);
    const weatherData = await getForecast(forecast);
    createDOMdisplay(weatherData);
    loadingAnimationEnd();
  } catch (err) {
    loadingAnimationEnd();
    if (err instanceof TypeError)
      document.querySelector('.error').textContent = 'City not found';
  }
}
let getForecast = async url => {
  const response = await fetch(url);
  const forecastData = await response.json();
  return forecastData;
};

let fetchCoordinates = async url => {
  const response = await fetch(url);
  const weatherData = await response.json();
  const coordinates = weatherData;
  coordinates.name = weatherData.name;
  coordinates.country = weatherData.sys.country;
  return coordinates;
};

let createRequestCoordinates = input => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=27863a0db6a7d4accadb9153ff953bbb`;
};

let createWeatherForcast = coordinates => {
  let lat = coordinates.coord.lat;
  let lon = coordinates.coord.lon;
  console.log(lat, lon);
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=standard&APPID=27863a0db6a7d4accadb9153ff953bbb`;
};

let normalizeInput = input => {
  return input.replace(/\s+/g, '').replace(/^\w/, c => c.toUpperCase());
};

export { getWeatherData };
