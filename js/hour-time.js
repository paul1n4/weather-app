
export function hourTime() {
  const $dayWeatherItem = document.querySelectorAll('.dayWeather-item')
  console.log($dayWeatherItem);

  $dayWeatherItem.forEach(($dayTime, index) => {
    $dayTime.addEventListener('click', handleSelectTimeClick)
  })
  
  function handleSelectTimeClick(event) {
    const $dayTimeSelected = event.target
    const $dayTimeOutline = document.querySelector('.dayWeather-item')
    $dayTimeOutline.classList.add("is-selected")

    const id = $dayTimeSelected.id
    const $detailWeather = document.querySelector(`[aria-labelledby=${id}]`)
    const $detailWeatherSelected = document.querySelector(`.detailWeather-container:not([hidden])`)
    $detailWeather.hidden = false
    $detailWeatherSelected.hidden = true
  }
}