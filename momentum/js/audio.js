import playlist from '../data/playlist.js'

const audioPlayMain = document.querySelector('#audioPlayMain')
const playlistEl = document.querySelector('#playlist')

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
  console.log('work')
}
function playPrev() {}

function initPlaylist() {
  playlistEl.innerHTML = `
  ${
    playlist.length > 0
      ? playlist
          .map(
            item =>
              `<li class="playlist-item" data-id="${item.id}">
               <button class="playlist-item__play-btn btn" title="Play/Pause Audio"></button>
              <div class="playlist-item__name">${item.title}</div>
            </li>`
          )
          .join('')
      : '---'
  }
  `
}


const audioVolumeRange = document.querySelector('#audioVolumeRange')

audioVolumeRange.addEventListener('input', (e) => {
  const input = e.target
  input.style.background = `linear-gradient(to right, #d8d8d8 0%, #d8d8d8 ${
    input.value * 70
  }%, #383838 ${input.value * 100}%, #383838 100%)`
  // currentVideo.volume = value
})

initPlaylist()

export { playAudio, initPlaylist, playNext }
