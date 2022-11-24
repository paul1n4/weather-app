import { WEATHER_API_KEY } from './apikey.js'

export const API_KEY = WEATHER_API_KEY

export const BASE_API = 'https://api.openweathermap.org/data/2.5/'

export const weatherConditionsCodes = {
  2: 'rainy',
  3: 'drizzle',
  5: 'rainy',
  6: 'drizzle',
  7: 'cloudy',
  8: 'clean',
}