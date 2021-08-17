import { quoteLang } from './quote.js'
import { showGreeting } from './greetingDaytime.js'
import { getUsernameFromStorage } from './greetingName.js'
import { changeAudioLang } from './audio.js'
import { getLangFromStorage } from './helpers.js'
import { showDate } from './date.js'
import { getWeather } from './weather.js'

const enLangInput = document.querySelector('#enLang')
const ruLangInput = document.querySelector('#ruLang')

let lang

function changeLang() {
  const updatedLang = this.value
  localStorage.setItem('lang', updatedLang)
  lang = this.value
  switchLang()
}

function setLang() {
  const langFromStore = getLangFromStorage()

  if (langFromStore == 'en') {
    enLangInput.checked = true
  } else {
    enLangInput.checked = false
    ruLangInput.checked = true
  }
}

function switchLang() {
  quoteLang()
  showGreeting()
  getUsernameFromStorage()
  changeAudioLang()
  showDate()
  getWeather()
}

window.addEventListener('load', () => {
  setLang()
})

export { lang, changeLang }
