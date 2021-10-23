import { changeInputColor, getLangFromStorage } from './helpers.js'

const weatherCityEl = document.querySelector('#weatherCity')
const weatherIcon = document.querySelector('#weatherIcon')
const weatherTempEl = document.querySelector('#weatherTemp')
const weatherDescEl = document.querySelector('#weatherDesc')
const weatherWindEl = document.querySelector('#weatherWind')
const weatherHumidityEl = document.querySelector('#weatherHumidity')
const weatherErrorEl = document.querySelector('.weather-widget__error')
const weatherInfoEl = document.querySelector('.weather-widget__info')

weatherCityEl.addEventListener('focus', e => changeInputColor(e))
weatherCityEl.addEventListener('blur', e => changeInputColor(e))
weatherCityEl.addEventListener('change', e => {
  city = e.target.value
  getWeather()
})

let city

function setCityToStorage() {
  localStorage.setItem('city', document.querySelector('#weatherCity').value)
}

function getCityFromStorage() {
  if (localStorage.getItem('city')) {
    city = localStorage.getItem('city')
    document.querySelector('#weatherCity').value = localStorage.getItem('city')
  } else {
    city = 'Minsk'
    document.querySelector('#weatherCity').value = 'Minsk'
  }
}

async function getWeather() {
  const lang = getLangFromStorage()
  if (lang === 'en') {
    document.querySelector('#weatherCity').placeholder = '[Enter city]'
  } else {
    document.querySelector('#weatherCity').placeholder = '[Введите город]'
  }
  try {
    if (city === 'Минск' || city === 'Minsk') {
      if (lang === 'en') {
        document.querySelector('#weatherCity').value = 'Minsk'
      } else {
        document.querySelector('#weatherCity').value = 'Минск'
      }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=01d522b353a969527c35ef13f4db2c3e&units=metric`
    const res = await fetch(url)
    const data = await res.json()

    const weatherId = data.weather[0].id
    const weatherDesc = data.weather[0].description
    const weatherTemp = Math.floor(data.main.temp)
    const weatherWind = Math.floor(data.wind.speed)
    const weatherHumidity = Math.floor(data.main.humidity)

    weatherIcon.classList.add(`owf-${weatherId}`)
    weatherTempEl.textContent = `${weatherTemp} °C`
    weatherDescEl.textContent = weatherDesc
    weatherWindEl.textContent = `${lang == 'en' ? 'Wind speed' : 'Скорость ветра'}: ${weatherWind} m/c`
    weatherHumidityEl.textContent = `${lang == 'en' ? 'Humidity' : 'Влажность'}: ${weatherHumidity} %`

    weatherErrorEl.classList.add('hidden')
    weatherInfoEl.classList.remove('hidden')
  } catch (e) {
    weatherErrorEl.classList.remove('hidden')
    weatherInfoEl.classList.add('hidden')
    if (lang === 'en') {
      weatherErrorEl.textContent = `Unfortunately, "${city}" is not exist :(`
    } else {
      weatherErrorEl.textContent = `К сожалению, "${city}" не существует :(`
    }
  }
}

window.addEventListener('beforeunload', () => {
  setCityToStorage()
})
window.addEventListener('load', () => {
  getCityFromStorage()
  getWeather()
})

export { getWeather }
