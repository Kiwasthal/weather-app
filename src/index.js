import './style.css';
import { getWeatherData } from './apiControl';

document.querySelector('.search').addEventListener('click', getWeatherData);
