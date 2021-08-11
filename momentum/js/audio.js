import playlist from "../data/playlist.js"

const audioPlayMain = document.querySelector('#audioPlayMain')

let isPlaying = false
let playNum = 0

const curAudio = new Audio()

function playAudio() {
  curAudio.src = playlist[playNum].src
  curAudio.currentTime = 0
  if (isPlaying) {
    curAudio.pause()
    audioPlayMain.classList.remove('audio-widget-pause-btn')
    audioPlayMain.classList.add('audio-widget-play-btn')
  } else {
    curAudio.play()
    audioPlayMain.classList.add('audio-widget-pause-btn')
    audioPlayMain.classList.remove('audio-widget-play-btn')
  }
  isPlaying = !isPlaying
}

function playNext() {
}
function playPrev() {
}

export {playAudio}
