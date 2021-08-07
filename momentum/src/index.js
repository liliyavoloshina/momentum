import showTime from './js/time'
import showDate from './js/date'
import showGreeting from './js/greetingDaytime'
import changeName from './js/greetingName'


const username = document.querySelector('#greetingName')
username.addEventListener('input', changeName)

showTime()
showDate()
showGreeting()

import './scss/styles.scss'