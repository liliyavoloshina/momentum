import {changeInputColor} from './helpers.js'

const nameEl = document.querySelector('#greetingName')
nameEl.addEventListener('focus', (e) => changeInputColor(e))
nameEl.addEventListener('blur', (e) => changeInputColor(e))


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
    document.querySelector('#greetingName').value = 'stranger'
  }
}

window.addEventListener('beforeunload', () => {
  setUsernameToStorage()
})
window.addEventListener('load', () => {
  getUsernameFromStorage()
})
