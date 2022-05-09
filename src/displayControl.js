import { addDays, getDate, format, parseISO } from 'date-fns';
import cloudyIcon from './assets/cloudy.svg';
import rainyIcon from './assets/rainy.svg';
import snowIcon from './assets/snowy.svg';
import clearIcon from './assets/day.svg';

let createDOMdisplay = data => {
  nextSevenDaysDisplay(data);
};

let loadingAnimationStart = () => {
  let animationModal = document.querySelector('.animation-modal');
  let animator = document.querySelector('.animator');
  animationModal.style.display = 'flex';
};

let loadingAnimationEnd = () => {
  let animationModal = document.querySelector('.animation-modal');
  animationModal.style.display = 'none';
};

let nextSevenDaysDisplay = data => {
  for (let i = 1; i <= 7; i++) {
    createDayCard(i, data);

    // const day = getDate(addDays(format(parseISO(new Date()), 'MM/dd/yyyy'), i));
  }
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
    parent.appendChild(cloudySVG);
  } else if (weatherCheck == 'Rain') {
    const rainySVG = new Image();
    rainySVG.src = rainyIcon;
    parent.appendChild(rainySVG);
  } else if (weatherCheck == 'Snow') {
    const snowSVG = new Image();
    snowSVG.src = snowIcon;
    parent.appendChild(snowSVG);
  } else {
    const clearSVG = new Image();
    clearSVG.src = clearIcon;
    parent.appendChild(clearSVG);
  }
};

let createDayCard = (i, data) => {
  const weatherCheck = data.daily[i].weather[0].main;
  let weeklyContainer = document.querySelector('.weekly-display');
  let dayCard = document.createElement('div');
  let dayHeader = document.createElement('h3');
  let weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  let mainInfo = document.createElement('div');
  dayHeader.textContent = getDay(i);
  createWeatherImages(mainInfo, weatherCheck);
  dayCard.appendChild(dayHeader);
  dayCard.appendChild(weatherInfo);
  weatherInfo.appendChild(mainInfo);
  weeklyContainer.appendChild(dayCard);
  console.log(data);
  console.log(data.daily[i].weather[0].main);
};

export { loadingAnimationStart, loadingAnimationEnd, createDOMdisplay };
