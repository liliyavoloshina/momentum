import { changeInputColor } from './helpers.js'

const weatherIcon = document.querySelector('.weather-icon')
const weatherTempEl = document.querySelector('.weather-temp')
const weatherDescEl = document.querySelector('.weather-desc')

const weatherCityEl = document.querySelector('#weatherCity')
weatherCityEl.addEventListener('focus', e => changeInputColor(e))
weatherCityEl.addEventListener('blur', e => changeInputColor(e))
weatherCityEl.addEventListener('change', e => {
  city = e.target.value
  getWeather()})

let lang = 'ru'
let city

function setCityToStorage() {
  localStorage.setItem('city', document.querySelector('#weatherCity').value)
}

function getCityFromStorage() {
  if (localStorage.getItem('city')) {
    city = localStorage.getItem('city')
    document.querySelector('#weatherCity').value = localStorage.getItem('city')
  } else {
    city = 'Минск'
    document.querySelector('#weatherCity').value = 'Минск'
  }
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=01d522b353a969527c35ef13f4db2c3e&units=metric`
  const res = await fetch(url)
  const data = await res.json()
  const weatherId = data.weather[0].id
  const weatherDesc = data.weather[0].description
  const weatherTemp = Math.floor(data.main.temp)

  weatherIcon.classList.add(`owf-${weatherId}`)
  weatherTempEl.textContent = `${weatherTemp}°C`
  weatherDescEl.textContent = weatherDesc
  console.log(city, weatherTemp, weatherDesc)
}

export { getWeather, setCityToStorage, getCityFromStorage }
