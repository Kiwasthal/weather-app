import './style.css';
import { getWeatherData } from './apiControl';
import { createMark } from './displayControl';

createMark();
document.querySelector('.search').addEventListener('click', getWeatherData);
