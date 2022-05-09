import './style.css';

let searchButton = document.querySelector('.search');
let userInput = document.querySelector('.form__field');

async function getWeatherData() {
  const inputCity = userInput.value;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${normalizeInput(
        inputCity
      )}&appid=27863a0db6a7d4accadb9153ff953bbb`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.weather[0].main);
  } catch {
    err => {
      console.log(err);
    };
  }
}

let normalizeInput = input => {
  return input.replace(/\s+/g, '').replace(/^\w/, c => c.toUpperCase());
};

searchButton.addEventListener('click', getWeatherData);
