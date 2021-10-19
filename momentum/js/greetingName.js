import { changeInputColor, getLangFromStorage } from './helpers.js'

const nameEl = document.querySelector('#greetingName')

async function changeNamePlaceholderLang() {
  const lang = getLangFromStorage()
  if (lang === 'en') {
    nameEl.placeholder = '[Enter name]'
  } else {
    nameEl.placeholder = '[Введите имя]'
  }
}

changeNamePlaceholderLang()

function setUsernameToStorage() {
  localStorage.setItem('username', document.querySelector('#greetingName').value)
}

function getUsernameFromStorage() {
  const username = localStorage.getItem('username')
  if (username) {
    nameEl.value = username
  }
}

nameEl.addEventListener('input', () => {
  setUsernameToStorage()
})

nameEl.addEventListener('focus', e => changeInputColor(e))
nameEl.addEventListener('blur', e => changeInputColor(e))
window.addEventListener('load', () => {
  getUsernameFromStorage()
})
export { getUsernameFromStorage, changeNamePlaceholderLang }
