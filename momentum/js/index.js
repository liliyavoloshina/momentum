import showTime from './time.js'
import showDate from './date.js'
import { showGreeting } from './greetingDaytime.js'
import { setUsernameToStorage, getUsernameFromStorage } from './greetingName.js'
import { getSlideNext, getSlidePrev, setBg } from './slider.js'
import { getWeather, setCityToStorage, getCityFromStorage } from './weather.js'
import changeQuote from './quote.js'

const slidePrev = document.querySelector('#slidePrev')
const slideNext = document.querySelector('#slideNext')
const quoteChangeBtn = document.querySelector('.quote-change')

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

showTime()
showDate()
showGreeting()
setBg()
