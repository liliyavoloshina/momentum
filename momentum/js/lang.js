import {chooseLang} from './quote.js'
const enLangInput = document.querySelector('#enLang')
const ruLangInput = document.querySelector('#ruLang')

let lang

function changeLang() {
  lang = this.value
  switchLang()
}

function setLangToStorage() {
  localStorage.setItem('lang', lang)
}

function getLangFromStorage() {
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
  }
}

function switchLang() {
  chooseLang(lang)
}

window.addEventListener('beforeunload', () => {
  setLangToStorage()
})

window.addEventListener('load', () => {
  getLangFromStorage()
})

getLangFromStorage()

export {lang, changeLang}