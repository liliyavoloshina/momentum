import showTime from './js/time'
import showDate from './js/date'
import showGreeting from './js/greetingDaytime'
import {setUsernameToStorage, getUsernameFromStorage} from './js/greetingName'

window.addEventListener('beforeunload', setUsernameToStorage)
window.addEventListener('load', getUsernameFromStorage)

showTime()
showDate()
showGreeting()

import './scss/styles.scss'