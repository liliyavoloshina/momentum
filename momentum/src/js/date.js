const dateEl = document.querySelector('.date')
let locale = 'en-US'
const options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timeZone: 'UTC'
}

function showDate() {
  const date = new Date()
  const currentDate = date.toLocaleDateString(locale, options)

  dateEl.textContent = currentDate

  setTimeout(showDate, 1000)
}

export default showDate
