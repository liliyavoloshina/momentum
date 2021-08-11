import showTime from './time.js'
import showDate from './date.js'
import { showGreeting } from './greetingDaytime.js'
import { setUsernameToStorage, getUsernameFromStorage } from './greetingName.js'
import { getSlideNext, getSlidePrev, setBg } from './slider.js'
import { getWeather, setCityToStorage, getCityFromStorage } from './weather.js'
import changeQuote from './quote.js'

const slidePrev = document.querySelector('#slidePrev')
const slideNext = document.querySelector('#slideNext')
const quoteChangeBtn = document.querySelector('#quoteChangeBtn')
const audioVolumeRange = document.querySelector('#audioVolumeRange')

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)
quoteChangeBtn.addEventListener('click', changeQuote)

window.addEventListener('beforeunload', () => {
  setUsernameToStorage()
  setCityToStorage()
})
window.addEventListener('load', () => {
  getUsernameFromStorage()
  getCityFromStorage()
  getWeather()
})

audioVolumeRange.addEventListener('input', function () {
  const value = this.value
  this.style.background = `linear-gradient(to right, #d8d8d8 0%, #d8d8d8 ${
    value * 70
  }%, #383838 ${value * 100}%, #383838 100%)`
  // currentVideo.volume = value
})

showTime()
showDate()
showGreeting()
setBg()
changeQuote()
