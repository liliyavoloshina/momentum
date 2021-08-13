import './lang.js'
import './time.js'
import './date.js'
import './greetingDaytime.js'
import './quote.js'
import './greetingName.js'
import './slider.js'
import  './weather.js'
import './audio.js'
import './settings.js'

import {getLangFromStorage} from './lang.js'
window.addEventListener('load', () => {
  getLangFromStorage()
})