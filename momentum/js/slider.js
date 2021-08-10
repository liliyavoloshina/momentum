import { getTimeOfDay } from './greetingDaytime.js'

function getRandomNum() {
  return Math.floor(Math.random() * 20)
}

function bgNum() {
  return getRandomNum().toString().padStart(2, 0)
}

function setBg() {
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum()}.jpg')`
}

export default setBg
