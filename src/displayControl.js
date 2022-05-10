import { addDays, getDate, format, parseISO } from 'date-fns';
import cloudyIcon from './assets/cloudy.svg';
import rainyIcon from './assets/rainy.svg';
import snowIcon from './assets/snowy.svg';
import clearIcon from './assets/day.svg';
import temperatureIcon from './assets/temperature.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
import { te } from 'date-fns/locale';

let emptyContainer = parent => {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
};

let loadingAnimationStart = () => {
  let animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'flex';
};

let loadingAnimationEnd = () => {
  let animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'none';
};

let getDay = i => {
  let day = addDays(new Date(), i);
  day = format(day, 'iiii');
  return day;
};

let createWeatherImages = (parent, weatherCheck) => {
  if (weatherCheck == 'Clouds') {
    const cloudySVG = new Image();
    cloudySVG.src = cloudyIcon;
    cloudySVG.classList.add('card-image');
    parent.appendChild(cloudySVG);
  } else if (weatherCheck == 'Rain') {
    const rainySVG = new Image();
    rainySVG.src = rainyIcon;
    rainySVG.classList.add('card-image');
    parent.appendChild(rainySVG);
  } else if (weatherCheck == 'Snow') {
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

let createCardTemperatures = (parent, data, index) => {
  const temperatureDiv = document.createElement('div');
  temperatureDiv.classList.add('card-temperatures');
  temperatureDiv.textContent = `${data.daily[index].temp.day}°C`;
  parent.appendChild(temperatureDiv);
};

let createCurrentDate = () => {
  const currentDate = document.createElement('div');
  currentDate.classList.add('current-title');
  currentDate.textContent = format(new Date(), 'MMM/dd/yyyy');
  return currentDate;
};

let createCurrentCity = data => {
  const currentCity = document.createElement('div');
  currentCity.classList.add('current-city');
  currentCity.textContent = data.timezone;
  return currentCity;
};

let createCurrentMain = data => {
  const currentMain = document.createElement('div');
  currentMain.classList.add('current-main-weather');
  currentMain.textContent = data.current.weather[0].main;
  return currentMain;
};

let currentTemperatureTitle = () => {
  let tempTitle = document.createElement('h3');
  tempTitle.classList.add('temp-title');
  tempTitle.textContent = 'Temperature:';
  return tempTitle;
};

let currentTemperatureContent = data => {
  let tempContent = document.createElement('p');
  tempContent.classList.add('temp-content');
  tempContent.textContent = `${data.current.temp}°C`;
  return tempContent;
};

let currentTemperatureImage = () => {
  const temperaturePNG = new Image();
  temperaturePNG.src = temperatureIcon;
  return temperaturePNG;
};

let createCurrentTemperatureWrapper = data => {
  const currentTemperature = document.createElement('div');
  currentTemperature.classList.add('current-temperature');
  currentTemperature.appendChild(currentTemperatureTitle());
  currentTemperature.appendChild(currentTemperatureContent(data));
  currentTemperature.appendChild(currentTemperatureImage());
  return currentTemperature;
};

let currentHumidityTitle = () => {
  let humidityTitle = document.createElement('h3');
  humidityTitle.classList.add('humidity-title');
  humidityTitle.textContent = 'Humidity:';
  return humidityTitle;
};

let currentHumidityContent = data => {
  let humidityContent = document.createElement('p');
  humidityContent.classList.add('humidity-content');
  humidityContent.textContent = data.current.humidity;
  return humidityContent;
};

let currentHumidityIcon = () => {
  const humidityPNG = new Image();
  humidityPNG.src = humidityIcon;
  return humidityPNG;
};

let createCurrentHumidityWrapper = data => {
  const currentHumidity = document.createElement('div');
  currentHumidity.classList.add('current-humidity');
  currentHumidity.appendChild(currentHumidityTitle());
  currentHumidity.appendChild(currentHumidityContent(data));
  currentHumidity.appendChild(currentHumidityIcon());
  return currentHumidity;
};

let currentWindTitle = () => {
  const windTitle = document.createElement('h3');
  windTitle.classList.add('wind-title');
  windTitle.textContent = 'Wind:';
  return windTitle;
};

let currentWindContent = data => {
  const currentWindContent = document.createElement('p');
  currentWindContent.classList.add('wind-content');
  currentWindContent.textContent = data.current.wind_speed;
  return currentWindContent;
};

let currentWindIcon = () => {
  const windPNG = new Image();
  windPNG.src = windIcon;
  return windPNG;
};

let createCurrentWindWrapper = data => {
  const currentWind = document.createElement('div');
  currentWind.classList.add('current-wind');
  currentWind.appendChild(currentWindTitle());
  currentWind.appendChild(currentWindContent(data));
  currentWind.appendChild(currentWindIcon());
  return currentWind;
};

let createCurrentDayCard = data => {
  const dayWrapper = document.querySelector('.current-day-wrapper');
  const currentDayContainer = document.createElement('div');
  currentDayContainer.classList.add('current-day');
  currentDayContainer.appendChild(createCurrentDate());
  currentDayContainer.appendChild(createCurrentCity(data));
  currentDayContainer.appendChild(createCurrentMain(data));
  createWeatherImages(currentDayContainer, data.current.weather[0].main);
  console.log(data);
  currentDayContainer.appendChild(createCurrentTemperatureWrapper(data));
  currentDayContainer.appendChild(createCurrentHumidityWrapper(data));
  currentDayContainer.appendChild(createCurrentWindWrapper(data));
  dayWrapper.appendChild(currentDayContainer);
};

let createDayCard = (i, data) => {
  const weatherCheck = data.daily[i].weather[0].main;
  let weeklyContainer = document.querySelector('.weekly-display');
  let dayCard = document.createElement('div');
  dayCard.classList.add('card');
  let dayHeader = document.createElement('h3');
  dayHeader.classList.add('card-header');
  let weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  dayHeader.textContent = getDay(i);
  createWeatherImages(dayCard, weatherCheck);
  createCardTemperatures(dayCard, data, i);
  dayCard.appendChild(dayHeader);
  dayCard.appendChild(weatherInfo);
  weeklyContainer.appendChild(dayCard);
};

let nextSevenDaysDisplay = data => {
  emptyContainer(document.querySelector('.weekly-display'));
  for (let i = 1; i <= 7; i++) {
    createDayCard(i, data);
  }
};

let createDOMdisplay = data => {
  emptyContainer(document.querySelector('.current-day-wrapper'));
  createCurrentDayCard(data);
  nextSevenDaysDisplay(data);
};

export { loadingAnimationStart, loadingAnimationEnd, createDOMdisplay };
