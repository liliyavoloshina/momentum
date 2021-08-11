import { getTimeOfDay } from './greetingDaytime.js'

const slidePrev = document.querySelector('#slidePrev')
const slideNext = document.querySelector('#slideNext')

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

let randomNum = getRandomNum()

function getRandomNum() {
  return Math.floor(Math.random() * 20)  + 1
}

function padNum(num) {
  return num.toString().padStart(2, 0)
}

function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${padNum(randomNum)}.jpg`
  img.addEventListener('load', () => {      
    document.body.style.backgroundImage = `url('${img.src}')`
  })
}

function getSlidePrev() {
  randomNum != 1 ? randomNum-- : randomNum = 20
  setBg()
}

function getSlideNext() {
  randomNum != 20 ? randomNum++ : randomNum = 1
  setBg()
}

setBg()
