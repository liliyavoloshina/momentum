import { getLangFromStorage } from './helpers.js'
const greetingDaytimeEl = document.querySelector('#greetingDaytime')

async function getTimeOfDay() {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 6 && hours < 12) {
    return 'morning'
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon'
  } else if (hours >= 18 && hours < 24) {
    return 'evening'
  } else if (hours >= 0 || hours < 6) {
    return 'night'
  }
}

async function getGreetingText() {
  const timeOfDay = await getTimeOfDay()
  const lang = getLangFromStorage()

  if (timeOfDay === 'morning') {
    if (lang == 'en') {
      return 'Good morning'
    } else {
      return 'Доброе утро'
    }
  } else if (timeOfDay === 'afternoon') {
    if (lang == 'en') {
      return 'Good afternoon'
    } else {
      return 'Добрый день'
    }
  } else if (timeOfDay === 'evening') {
    if (lang == 'en') {
      return 'Good evening'
    } else {
      return 'Добрый вечер'
    }
  } else if (timeOfDay === 'night') {
    if (lang == 'en') {
      return 'Good night'
    } else {
      return 'Доброй ночи'
    }
  }
}

async function showGreeting() {
  const greetingText = `${await getGreetingText()},`
  greetingDaytimeEl.textContent = greetingText

  setTimeout(showGreeting, 1000)
}

showGreeting()

export { getTimeOfDay, showGreeting }
