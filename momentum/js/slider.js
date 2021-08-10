import { getTimeOfDay } from './greetingDaytime.js'

let randomNum = getRandomNum()

function getRandomNum() {
  return Math.floor(Math.random() * 20)
}

function padNum(num) {
  return num.toString().padStart(2, 0)
}

function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${padNum(randomNum)}.jpg`
  img.addEventListener('load', () => {      
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${padNum(randomNum)}.jpg')`
  })
}

function getSlidePrev() {
  randomNum != 1 ? randomNum-- : randomNum = 20
  console.log(randomNum, 'getSlidePrev()')
  setBg()
}

function getSlideNext() {
  randomNum != 20 ? randomNum++ : randomNum = 1
  console.log(randomNum, 'getSlideNext')
  setBg()
}

export {getSlidePrev, getSlideNext, setBg}
