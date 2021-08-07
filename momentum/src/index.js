import showTime from './js/time'
import showDate from './js/date'
import showGreeting from './js/greetingDaytime'
import changeName from './js//greetingName'


const username = document.querySelector('#greetingName')
username.addEventListener('input', changeName)

// function setUsernameToStorage() {
//   localStorage.setItem('username', username)
// }

// function getUsernameFromStorage() {
//   if(localStorage.getItem('username')) {
//     username = localStorage.getItem('username')
//   }
// }


// window.addEventListener('beforeunload', setUsernameToStorage)
// window.addEventListener('load', getUsernameFromStorage)

showTime()
showDate()
showGreeting()

import './scss/styles.scss'