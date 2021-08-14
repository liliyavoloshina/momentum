import { lang } from './lang.js' 
// let { lang } = await import('./lang.js')
// let lang = 'en'
const greetingDaytimeEl = document.querySelector('#greetingDaytime')

async function getTimeOfDay() {
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

async function getGreetingText() {
  const timeOfDay =  await getTimeOfDay()
  if (timeOfDay === 'morning') {
    if (lang == 'en') {
      return 'Good morning'
    } else {
      return 'Доброе утро'
    }
  } else if (timeOfDay === 'day') {
    if (lang == 'en') {
      return 'Good day'
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
  console.log('show greet')
  const greetingText = `${await getGreetingText()},`
  greetingDaytimeEl.textContent = greetingText
}

showGreeting()

export { getTimeOfDay, showGreeting }
