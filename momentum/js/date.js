import {lang} from './helpers.js'

const dateEl = document.querySelector('#date')
let locale = lang === 'en' ? 'en-US' : 'ru-RU'
const options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

function showDate() {
  const date = new Date()
  const currentDate = date.toLocaleDateString(locale, options)

  dateEl.textContent = currentDate

  setTimeout(showDate, 1000)
}

export default showDate
