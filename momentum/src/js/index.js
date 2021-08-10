import showTime from './time'
import showDate from './date'
import showGreeting from './greetingDaytime'
import {setUsernameToStorage, getUsernameFromStorage} from './greetingName'

window.addEventListener('beforeunload', setUsernameToStorage)
window.addEventListener('load', getUsernameFromStorage)

showTime()
showDate()
showGreeting()

import './scss/styles.scss'