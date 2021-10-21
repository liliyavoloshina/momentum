import { getLangFromStorage } from './helpers.js'

const dateEl = document.querySelector('#date')

const options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}

function showDate() {
  const lang = getLangFromStorage()
  const locale = lang === 'en' ? 'en-US' : 'ru-RU'
  const date = new Date()
  const currentDate = date.toLocaleDateString(locale, options)

  dateEl.textContent = currentDate

  setTimeout(showDate, 1000)
}


showDate()

export {showDate}
