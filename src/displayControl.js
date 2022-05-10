import { addDays, format } from 'date-fns';
import cloudyIcon from './assets/cloudy.svg';
import rainyIcon from './assets/rainy.svg';
import snowIcon from './assets/snowy.svg';
import clearIcon from './assets/day.svg';
import temperatureIcon from './assets/temperature.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
import githubIcon from './assets/mark.png';

const emptyContainer = (parent) => {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
};

const createMark = () => {
  const githubMark = new Image();
  githubMark.src = githubIcon;
  document.querySelector('a').appendChild(githubMark);
};

const loadingAnimationStart = () => {
  const animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'flex';
};

const loadingAnimationEnd = () => {
  const animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'none';
};

const getDay = (i) => {
  let day = addDays(new Date(), i);
  day = format(day, 'iiii');
  return day;
};

const createWeatherImages = (parent, weatherCheck) => {
  if (weatherCheck === 'Clouds') {
    const cloudySVG = new Image();
    cloudySVG.src = cloudyIcon;
    cloudySVG.classList.add('card-image');
    parent.appendChild(cloudySVG);
  } else if (weatherCheck === 'Rain') {
    const rainySVG = new Image();
    rainySVG.src = rainyIcon;
    rainySVG.classList.add('card-image');
    parent.appendChild(rainySVG);
  } else if (weatherCheck === 'Snow') {
    const snowSVG = new Image();
    snowSVG.src = snowIcon;
    snowSVG.classList.add('card-image');
    parent.appendChild(snowSVG);
  } else {
    const clearSVG = new Image();
    clearSVG.classList.add('card-image');
    clearSVG.src = clearIcon;
    parent.appendChild(clearSVG);
  }
};

const createCardTemperatures = (parent, data, index) => {
  const temperatureDiv = document.createElement('div');
  temperatureDiv.classList.add('card-temperatures');
  temperatureDiv.textContent = `${data.daily[index].temp.day}°C`;
  parent.appendChild(temperatureDiv);
};

const createCurrentDate = () => {
  const currentDate = document.createElement('div');
  currentDate.classList.add('current-title');
  currentDate.textContent = format(new Date(), 'MMM/dd/yyyy');
  return currentDate;
};

const createCurrentCity = (data) => {
  const currentCity = document.createElement('div');
  currentCity.classList.add('current-city');
  currentCity.textContent = data.timezone;
  return currentCity;
};

const createCurrentMain = (data) => {
  const currentMain = document.createElement('div');
  currentMain.classList.add('current-main-weather');
  currentMain.textContent = data.current.weather[0].main;
  return currentMain;
};

const currentTemperatureTitle = () => {
  const tempTitle = document.createElement('h3');
  tempTitle.classList.add('temp-title');
  tempTitle.textContent = 'Temperature:';
  return tempTitle;
};

const currentTemperatureContent = (data) => {
  const tempContent = document.createElement('p');
  tempContent.classList.add('temp-content');
  tempContent.textContent = `${data.current.temp}°C`;
  return tempContent;
};

const currentTemperatureImage = () => {
  const temperaturePNG = new Image();
  temperaturePNG.src = temperatureIcon;
  return temperaturePNG;
};

const createCurrentTemperatureWrapper = (data) => {
  const currentTemperature = document.createElement('div');
  currentTemperature.classList.add('current-temperature');
  currentTemperature.appendChild(currentTemperatureTitle());
  currentTemperature.appendChild(currentTemperatureContent(data));
  currentTemperature.appendChild(currentTemperatureImage());
  return currentTemperature;
};

const currentHumidityTitle = () => {
  const humidityTitle = document.createElement('h3');
  humidityTitle.classList.add('humidity-title');
  humidityTitle.textContent = 'Humidity:';
  return humidityTitle;
};

const currentHumidityContent = (data) => {
  const humidityContent = document.createElement('p');
  humidityContent.classList.add('humidity-content');
  humidityContent.textContent = `${data.current.humidity}%`;
  return humidityContent;
};

const currentHumidityIcon = () => {
  const humidityPNG = new Image();
  humidityPNG.src = humidityIcon;
  return humidityPNG;
};

const createCurrentHumidityWrapper = (data) => {
  const currentHumidity = document.createElement('div');
  currentHumidity.classList.add('current-humidity');
  currentHumidity.appendChild(currentHumidityTitle());
  currentHumidity.appendChild(currentHumidityContent(data));
  currentHumidity.appendChild(currentHumidityIcon());
  return currentHumidity;
};

const currentWindTitle = () => {
  const windTitle = document.createElement('h3');
  windTitle.classList.add('wind-title');
  windTitle.textContent = 'Wind:';
  return windTitle;
};

const currentWindContents = (data) => {
  const currentWindContent = document.createElement('p');
  currentWindContent.classList.add('wind-content');
  currentWindContent.textContent = `${data.current.wind_speed} m/s`;
  return currentWindContent;
};

const currentWindIcon = () => {
  const windPNG = new Image();
  windPNG.src = windIcon;
  return windPNG;
};

const createCurrentWindWrapper = (data) => {
  const currentWind = document.createElement('div');
  currentWind.classList.add('current-wind');
  currentWind.appendChild(currentWindTitle());
  currentWind.appendChild(currentWindContents(data));
  currentWind.appendChild(currentWindIcon());
  return currentWind;
};

const createCurrentDayCard = (data) => {
  const dayWrapper = document.querySelector('.current-day-wrapper');
  const currentDayContainer = document.createElement('div');
  currentDayContainer.classList.add('current-day');
  currentDayContainer.appendChild(createCurrentDate());
  currentDayContainer.appendChild(createCurrentCity(data));
  currentDayContainer.appendChild(createCurrentMain(data));
  createWeatherImages(currentDayContainer, data.current.weather[0].main);
  currentDayContainer.appendChild(createCurrentTemperatureWrapper(data));
  currentDayContainer.appendChild(createCurrentHumidityWrapper(data));
  currentDayContainer.appendChild(createCurrentWindWrapper(data));
  dayWrapper.appendChild(currentDayContainer);
};

const createDayCard = (i, data) => {
  const weatherCheck = data.daily[i].weather[0].main;
  const weeklyContainer = document.querySelector('.weekly-display');
  const dayCard = document.createElement('div');
  dayCard.classList.add('card');
  const dayHeader = document.createElement('h3');
  dayHeader.classList.add('card-header');
  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  dayHeader.textContent = getDay(i);
  createWeatherImages(dayCard, weatherCheck);
  createCardTemperatures(dayCard, data, i);
  dayCard.appendChild(dayHeader);
  dayCard.appendChild(weatherInfo);
  weeklyContainer.appendChild(dayCard);
};

const nextSevenDaysDisplay = (data) => {
  emptyContainer(document.querySelector('.weekly-display'));
  for (let i = 1; i <= 7; i += 1) {
    createDayCard(i, data);
  }
};

const createDOMdisplay = (data) => {
  emptyContainer(document.querySelector('.current-day-wrapper'));
  createCurrentDayCard(data);
  nextSevenDaysDisplay(data);
};

export {
  loadingAnimationStart,
  loadingAnimationEnd,
  createDOMdisplay,
  createMark,
};
