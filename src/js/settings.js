import { getLangFromStorage } from './helpers.js'
import { changeLang } from './lang.js'

const langInputs = document.querySelectorAll('input[name="lang"]')

const settingTitle = document.querySelector('.langs-title')
const enRadio = document.querySelector('.en-radio')
const ruRadio = document.querySelector('.ru-radio')

const widgetsTitle = document.querySelector('.widgets-title')
const audioCheckbox = document.querySelector('.audio-checkbox')
const weatherCheckbox = document.querySelector('.weather-checkbox')
const timeCheckbox = document.querySelector('.time-checkbox')
const dateCheckbox = document.querySelector('.date-checkbox')
const greetingCheckbox = document.querySelector('.greeting-checkbox')
const quoteCheckbox = document.querySelector('.quote-checkbox')
const todoCheckbox = document.querySelector('.todo-checkbox')

const photosTitle = document.querySelector('.photos-title')
const photoTagTitle = document.querySelector('.phototag-title')
const photoNote = document.querySelector('.photo-note')


function getSettingLang() {
  const lang = getLangFromStorage()
  if (lang === 'ru') {
    settingTitle.textContent = 'Настройки'
    enRadio.textContent = 'Английский'
    ruRadio.textContent = 'Русский'
    widgetsTitle.textContent = 'Активные виджеты'
    audioCheckbox.textContent = 'Аудио'
    weatherCheckbox.textContent = 'Погода'
    timeCheckbox.textContent = 'Время'
    dateCheckbox.textContent = 'Дата'
    greetingCheckbox.textContent = 'Приветствие'
    quoteCheckbox.textContent = 'Цитата'
    todoCheckbox.textContent = 'Дела'
    photosTitle.textContent = 'Фон'
    photoTagTitle.textContent = 'Фото тэг'
    photoNote.textContent = '*если выбран не github может быть задержка'
    
  } else {
    settingTitle.textContent = 'Settings'
    enRadio.textContent = 'English'
    ruRadio.textContent = 'Russian'
    widgetsTitle.textContent = 'Active widgets'
    audioCheckbox.textContent = 'Audio'
    weatherCheckbox.textContent = 'Weather'
    timeCheckbox.textContent = 'Time'
    dateCheckbox.textContent = 'Date'
    greetingCheckbox.textContent = 'Greeting'
    quoteCheckbox.textContent = 'Quote'
    todoCheckbox.textContent = 'Todo'
    photosTitle.textContent = 'Photo Source'
    photoTagTitle.textContent = 'Photo Tag'
    photoNote.textContent = '*if you chose not github, changing images can be slow'
  }
}

getSettingLang()

langInputs.forEach(input => {
  input.addEventListener('change', changeLang)
})

export {getSettingLang}
