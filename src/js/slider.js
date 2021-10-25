import { getTimeOfDay } from './greetingDaytime.js'
import { getSourceFromStorage, getTagFromStorage } from './images.js'

const slidePrev = document.querySelector('#slidePrev')
const slideNext = document.querySelector('#slideNext')
const imageLoader = document.querySelector('#imageLoader')

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
  imageLoader.classList.add('show')

  const timeOfDay = await getTimeOfDay(),
    source = getSourceFromStorage(),
    tag = getTagFromStorage()

  let url

  const request = tag !== '' ? tag : timeOfDay

  if (source === 'unsplash') {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${request}&client_id=ZMe8BGgm8MXpmbZUBCgMi4m1CTgEQhzy90dkk9gjcpY`
    )

    const json = await response.json()
    url = json.urls.raw

    console.log(`✨ URL изображения: ${response.url}`)
    console.log(`✨ Тэг: ${request}`)
  }

  if (source === 'flickr') {
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d67d8fac287c9a1f0a13e08a11231403&tags=${request}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`
    )
    const json = await response.json()
    const photos = json.photos.photo
    const randomImage = photos[Math.floor(Math.random() * photos.length)]
    url = randomImage.url_h

    console.log(`✨ URL изображения: ${response.url}`)
    console.log(`✨ Тэг: ${request}`)
  }

  if (source === 'github') {
    console.log(`✨ Изображения перелистываются последовательно: ${padNum(randomNum)}`)

    url = `https://raw.githubusercontent.com/liliyavoloshina/stage1-tasks/assets/images/${timeOfDay}/${padNum(
      randomNum
    )}.jpg`

    console.log(`✨ URL изображения: ${url}`)
  }

  const img = new Image()
  img.src = url
  img.addEventListener('load', () => {
    document.body.style.backgroundImage = `url('${img.src}')`

    imageLoader.classList.remove('show')
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
