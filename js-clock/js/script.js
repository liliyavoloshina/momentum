let locale = 'ru-RU',
  volume = 'mute'

setTimeout(function clock() {
  const date = new Date()

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const hour = (((hours + 11) % 12) + 1) * 30
  const minute = minutes * 6
  const second = seconds * 6

  document.querySelector('.hours').style.transform = `rotate(${hour}deg)`
  document.querySelector('.minutes').style.transform = `rotate(${minute}deg)`
  document.querySelector('.seconds').style.transform = `rotate(${second}deg)`

  document.querySelector(
    '.clock__details'
  ).innerHTML = `${date.toLocaleTimeString(locale)}`

  if (minutes > 56 || minutes < 6) {
    document.querySelector('.clock__details').style.bottom = '45px'
  } else {
    document.querySelector('.clock__details').style.top = '45px'
  }
  setTimeout(clock, 1000)
}, 1000)

function calendar() {
  const monthEl = document.querySelector('.month'),
    dayEl = document.querySelector('.day'),
    weekdayEl = document.querySelector('.weekday'),
    yearEl = document.querySelector('.year')

  let date = new Date()
  let day = date.getDate()
  let month = date.toLocaleString(locale, { month: 'long' })
  let weekday = date.toLocaleString(locale, { weekday: 'long' })
  let year = date.getFullYear()

  monthEl.innerHTML = `${month}`
  dayEl.innerHTML = `${day}`
  weekdayEl.innerHTML = `${weekday}`
  yearEl.innerHTML = `${year}`
}

calendar()

const switchLang = document.querySelector('#switch-lang'),
  switchLangImg = document.querySelector('#switch-lang-img')

const switchVol = document.querySelector('#switch-vol'),
  switchVolImg = document.querySelector('#switch-vol-img')

switchLang.addEventListener('change', () => {
  if (locale === 'en-US') {
    locale = 'ru-RU'
    switchLangImg.style.backgroundImage = "url('./img/ru.png')"
  } else {
    locale = 'en-US'
    switchLangImg.style.backgroundImage = "url('./img/us.png')"
  }
  calendar()
})

switchVol.addEventListener('change', () => {
  if (volume === 'unmute') {
    volume = 'mute'
    switchVolImg.style.backgroundImage = "url('./img/vol-mute.png')"

    document.querySelector('audio').pause()
    document.querySelector('audio').currentTime = 0
  } else {
    volume = 'unmute'
    switchVolImg.style.backgroundImage = "url('./img/vol-unmute.png')"

    document.querySelector('audio').play()
  }
})
