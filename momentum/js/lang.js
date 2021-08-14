import { quoteLang } from './quote.js'
import { showGreeting } from './greetingDaytime.js'
import { getUsernameFromStorage } from './greetingName.js'
import { changeAudioLang } from './audio.js'

const enLangInput = document.querySelector('#enLang')
const ruLangInput = document.querySelector('#ruLang')

let lang

await getLangFromStorage()

console.log(lang, 'lang from lang')

function changeLang() {
  lang = this.value
  switchLang()
}

function setLangToStorage() {
  localStorage.setItem('lang', lang)
}

async function getLangFromStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang')
    if (lang == 'en') {
      enLangInput.checked = true
    } else {
      enLangInput.checked = false
      ruLangInput.checked = true
    }
  } else {
    lang = 'en'
    enLangInput.checked = true
  }
}

function switchLang() {
  quoteLang()
  showGreeting()
  getUsernameFromStorage()
  changeAudioLang()
}

window.addEventListener('beforeunload', () => {
  setLangToStorage()
})

window.addEventListener('load', async () => {
  await getLangFromStorage()
})

export { lang, changeLang, getLangFromStorage }
