import {
  loadingAnimationEnd,
  loadingAnimationStart,
  createDOMdisplay,
} from './displayControl';

const userInput = document.querySelector('.form__field');

const normalizeInput = (input) => {
  return input.replace(/\s+/g, '').replace(/^\w/, (c) => c.toUpperCase());
};

const getForecast = async (url) => {
  const response = await fetch(url);
  const forecastData = await response.json();
  return forecastData;
};

const fetchCoordinates = async (url) => {
  const response = await fetch(url);
  const weatherData = await response.json();
  const coordinates = weatherData;
  coordinates.name = weatherData.name;
  coordinates.country = weatherData.sys.country;
  return coordinates;
};

const createRequestCoordinates = (input) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=27863a0db6a7d4accadb9153ff953bbb`;
};

const createWeatherForcast = (coordinates) => {
  const lat = coordinates.coord.lat;
  const lon = coordinates.coord.lon;
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=Metric&APPID=27863a0db6a7d4accadb9153ff953bbb`;
};

export default async function getWeatherData() {
  if (userInput.value === '') return;
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
    if (err instanceof TypeError) {
      document.querySelector('.error').textContent = 'City not found';
    }
  }
}
