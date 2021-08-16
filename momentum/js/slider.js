import { getTimeOfDay } from './greetingDaytime.js'
import { getSourceFromStorage } from './images.js'

const slidePrev = document.querySelector('#slidePrev')
const slideNext = document.querySelector('#slideNext')

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

let randomNum = getRandomNum()

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1
}

function padNum(num) {
  return num.toString().padStart(2, 0)
}

async function setBg() {
  let source = getSourceFromStorage()
  console.log(source, 'setBg')
  let url
  let tag = 'nature'
  if (source === 'unsplash') {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=ZMe8BGgm8MXpmbZUBCgMi4m1CTgEQhzy90dkk9gjcpY`
    )
    const json = await response.json()
    url = json.urls.raw
  }
  if (source === 'github') {
    url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${await getTimeOfDay()}/${padNum(
      randomNum
    )}.jpg`
  }
  const img = new Image()
  img.src = url
  img.addEventListener('load', () => {
    document.body.style.backgroundImage = `url('${img.src}')`
  })
}

function getSlidePrev() {
  randomNum != 1 ? randomNum-- : (randomNum = 20)
  setBg()
}

function getSlideNext() {
  randomNum != 20 ? randomNum++ : (randomNum = 1)
  setBg()
}

setBg()

export { setBg }
