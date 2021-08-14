import { lang } from './lang.js'
import {changeInputColor} from './helpers.js'

const nameEl = document.querySelector('#greetingName')

function setUsernameToStorage() {
  localStorage.setItem(
    'username',
    document.querySelector('#greetingName').value
  )
}

function getUsernameFromStorage() {
  if (localStorage.getItem('username')) {
    document.querySelector('#greetingName').value = localStorage.getItem('username')
  } else {
    console.log(lang, 'lang from name')
    document.querySelector('#greetingName').value = lang == 'ru' ? 'незнакомец' : 'stranger'
  }
}

nameEl.addEventListener('focus', (e) => changeInputColor(e))
nameEl.addEventListener('blur', (e) => changeInputColor(e))
window.addEventListener('beforeunload', () => {
  setUsernameToStorage()
})
window.addEventListener('load', () => {
  getUsernameFromStorage()
})
export {getUsernameFromStorage}
