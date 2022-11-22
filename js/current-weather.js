import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js' 
import { getLatLon } from './geolocation.js'

function setCurrentCity($el, city) {
  $el.textContent = city
}

function setCurrentDate($el) {
  const date = new Date()
  const formattedDate = formatDate(date)
  $el.textContent = formattedDate
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours()
  const sunsetHours = sunsetTime.getHours()
  const sunriseHours = sunriseTime.getHours()

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return 'night'
  }
  return 'morning'
}

function setBackground($el, conditionCode, solarStatus) {
  const weatherType = weatherConditionsCodes[conditionCode]
  const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
 /*  let size = ''
  if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches) {
    size = '@2x'
  } */
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function configCurrentWeather (weather) {
  //loader

  //date
  const $currentWeatherDate = document.querySelector('#current-weather-date')
  setCurrentDate($currentWeatherDate)

  //city
  const $currentWeatherCity = document.querySelector('#current-weather-city')
  const city = weather.name 
  setCurrentCity($currentWeatherCity, city)

  //temp
  const $currentWeatherTemp = document.querySelector('#current-weather-temp')
  const temp = weather.main.temp
  setCurrentTemp($currentWeatherTemp, temp)

  //background
  const sunriseTime = new Date(weather.sys.sunrise * 1000)
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  const $app = document.querySelector('#app')
  const conditionCode = String(weather.weather[0].id).charAt(0)
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather () {
  // GEO // API -weather / Config
  console.log('esto pasa antes de getCurrentPosition')
  const {lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote');
  console.log(lat, lon);



  /* getCurrentPosition()
  .then((data) => {
    console.log(data);
  })
  .catch((message) => {
    console.log(message);
  }) */
  configCurrentWeather(weather) 
}