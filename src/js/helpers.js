function changeInputColor(e) {
  if (e.target.classList.contains('input-inactive')) {
    e.target.classList.add('input-active')
    e.target.classList.remove('input-inactive')
  } else {
    e.target.classList.add('input-inactive')
    e.target.classList.remove('input-active')
  }
}

function getLangFromStorage() {
  if (localStorage.getItem('lang')) {
    return localStorage.getItem('lang')
  } else {
    return 'en'
  }
}

const preloadedImages = new Array()
const images = ['../img/unmute.png', '../img/mute.png', '../img/play-audio.png', '../img/pause-audio.png']

function preload(images) {
  for (let i = 0; i < images.length; i++) {
    preloadedImages[i] = new Image()
    preloadedImages[i].src = images[i]
  }
}

preload(images)

const audioFiles = ['./audio/chill-vibes.mp3', './audio/chillout.mp3', './audio/easy-guitar.mp3']

function preloadAudio(audioFiles) {
  for (let i = 0; i < audioFiles.length; i++) {
    const audio = new Audio()
    audio.src = audioFiles[i]
    audio.load()
  }
}

preloadAudio(audioFiles)

export { changeInputColor, getLangFromStorage }
