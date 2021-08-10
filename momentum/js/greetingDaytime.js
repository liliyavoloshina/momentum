const greetingDaytimeEl = document.querySelector('#greetingDaytime')

function getTimeOfDay() {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 5 && hours < 12) {
    return 'morning'
  } else if (hours >= 12 && hours < 17) {
    return 'day'
  } else if (hours >= 17 && hours < 21) {
    return 'evening'
  } else if (hours >= 21 || hours < 5) {
    return 'night'
  }
}

function showGreeting() {
  const timeOfDay = getTimeOfDay()
  const greetingText = `Good ${timeOfDay},`
  greetingDaytimeEl.textContent = greetingText
}

export {showGreeting, getTimeOfDay}
