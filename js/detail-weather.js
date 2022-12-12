import { createDOM } from './utils/dom.js'
import { formatTemp } from './utils/format-data.js'

export function detailWeatherTemplate({ maxTemp, minTemp, wind, humidity, id }) {
  return `
    <div class="detailWeather-container" aria-labelledby="dayTime-${id}">
      <div class="detailWeather-list">
        <p>
          Max:
          <span>${maxTemp}˚</span>
        </p>
        <p>
          Min:
          <span>${minTemp}˚</span>
        </p>
        <p>
          Viento:
          <span>${wind} Km-h</span>
        </p>
        <p>
          Humedad:
          <span>${humidity}%</span>
        </p>
      </div>
    </div>
  `
}

export function createDetailWeather(weather, id) {
  const maxTemp = formatTemp(weather.main.temp_max)
  const minTemp = formatTemp(weather.main.temp_min)
  const config = {
    maxTemp,
    minTemp,
    wind: weather.wind.speed,
    humidity: weather.main.humidity,
    id
  }
  return createDOM(detailWeatherTemplate(config))
}
