import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import { createDetailWeather } from './detail-weather.js'
import draggable from './draggable.js'
import { hourTime } from './hour-time.js'

function tabPanelTemplate(id) {
  return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
      <div class="dayWeather" id="dayWeather-${id}">
        <ul class="dayWeather-list" id="dayWeather-list-${id}">
          
        </ul>
      </div>
    </div>
  `
}

function createTabPanel(id) {
  const $GroupPanel = createDOM(tabPanelTemplate(id))
  if (id > 0) {
    $GroupPanel.hidden = true
  }
  return $GroupPanel
}

function firstDetailWeather(timeWeather, id) {
  const $detail = createDetailWeather(timeWeather, id)
  if(id > 0){
    $detail.hidden = true
  }
  return $detail
}


function configWeeklyWeather(weeklist) {
  const $container = document.querySelector('.tabs')
  const $detailContainer = document.querySelector('.detailWeather')

  weeklist.forEach((day, index) => {
    const $GroupPanel = createTabPanel(index)
    $container.append($GroupPanel)

    
    day.forEach((timeWeather, indexWeather) => {
      $GroupPanel.querySelector('.dayWeather-list').append(createPeriodTime(timeWeather, indexWeather))
      const $detail = firstDetailWeather(timeWeather, indexWeather)
      $detailContainer.append($detail)
    })
  })
}

export default async function weeklyWeather() {
  const $container = document.querySelector('.weeklyWeather')
  const {lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote');
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('oh! ha ocurrido un error trayendo el pronóstico del clima');
  const weeklist = formatWeekList(weather.list)
  configWeeklyWeather(weeklist)
  draggable($container)
  hourTime() 
}