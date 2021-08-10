const greetingDaytimeEl = document.querySelector('#greetingDaytime')

function getTimeOfDay() {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 6 && hours < 12) {
    return 'morning'
  } else if (hours >= 12 && hours < 18) {
    return 'day'
  } else if (hours >= 18 && hours < 24) {
    return 'evening'
  } else if (hours >= 0 || hours < 6) {
    return 'night'
  }
}

function showGreeting() {
  const timeOfDay = getTimeOfDay()
  const greetingText = `Good ${timeOfDay},`
  greetingDaytimeEl.textContent = greetingText
}

export {showGreeting, getTimeOfDay}
