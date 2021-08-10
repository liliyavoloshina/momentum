import showTime from './time.js'
import showDate from './date.js'
import showGreeting from './greetingDaytime.js'
import { setUsernameToStorage, getUsernameFromStorage } from './greetingName.js'

window.addEventListener('beforeunload', setUsernameToStorage)
window.addEventListener('load', getUsernameFromStorage)

showTime()
showDate()
showGreeting()
