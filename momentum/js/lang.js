import { quoteLang } from './quote.js'
import { showGreeting } from './greetingDaytime.js'
import { getUsernameFromStorage } from './greetingName.js'
import { changeAudioLang } from './audio.js'
import { getLangFromStorage } from './helpers.js'

const enLangInput = document.querySelector('#enLang')
const ruLangInput = document.querySelector('#ruLang')

let lang
console.log('lang loaded')

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
  // console.log(lang)
  quoteLang()
  showGreeting()
  getUsernameFromStorage()
  changeAudioLang()
}

window.addEventListener('load', async () => {
  await setLang()
  console.log('load')
})

export { lang, changeLang }
