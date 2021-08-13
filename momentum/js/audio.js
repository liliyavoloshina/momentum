import playlist from '../data/playlist.js'

const audioPlayMain = document.querySelector('#audioPlayMain')
const audioNextMain = document.querySelector('#audioNextMain')
const audioPrevMain = document.querySelector('#audioPrevMain')
const audioNameEl = document.querySelector('#audioName')
const audioProgressEl = document.querySelector('#audioProgress')
const audioProgressFillEl = document.querySelector('#audioProgressFill')
const audioDurationEndEl = document.querySelector('#audioDurationEnd')
const audioDurationCurEl = document.querySelector('#audioDurationCur')
const playlistEl = document.querySelector('#playlist')

initPlaylist()

const playlistItemsEls = document.querySelectorAll('.playlist-item')

let isPlaying = false
let playNum = 0
let curAudioEl
let durationEnd = playlist[0].duration

// инициализация песни
const curAudio = new Audio()
curAudio.src = playlist[playNum].src
curAudio.currentTime = 0
curAudio.dataset.id = playlist[playNum].id

curAudioEl = document.querySelector(`[data-id="${curAudio.dataset.id}"]`)
curAudioEl.classList.add('active')

audioNameEl.textContent = playlist[playNum].title
audioDurationEndEl.textContent = `00:${durationEnd}`

function updateProgress() {
  const percent = (curAudio.currentTime / curAudio.duration) * 100
  const currentTime = Math.floor(curAudio.currentTime).toString().padStart(2, 0)
  audioProgressFillEl.style.flexBasis = `${percent}%`
  audioDurationCurEl.textContent = `00:${currentTime}`

  if (curAudio.currentTime === curAudio.duration) {
    playNext()
  }
}

function toggleMainBtn() {
  if (isPlaying) {
    audioPlayMain.classList.add('audio-widget-pause-btn')
    audioPlayMain.classList.remove('audio-widget-play-btn')
  } else {
    audioPlayMain.classList.remove('audio-widget-pause-btn')
    audioPlayMain.classList.add('audio-widget-play-btn')
  }
}

function togglePlay() {
  if (isPlaying) {
    curAudio.pause()
  } else {
    curAudio.play()
  }
  isPlaying = !isPlaying
  toggleMainBtn()
}

function initCurrent() {
  curAudioEl.classList.remove('active')
  curAudio.src = playlist[playNum].src
  curAudio.currentTime = 0
  curAudio.dataset.id = playlist[playNum].id
  curAudioEl = document.querySelector(`[data-id="${curAudio.dataset.id}"]`)
  curAudio.play()
  curAudioEl.classList.add('active')
  isPlaying = true
  toggleMainBtn()
  audioNameEl.textContent = playlist[playNum].title
  durationEnd = playlist[playNum].duration
  audioDurationEndEl.textContent = `00:${durationEnd}`
}

function playNext() {
  if (playNum + 1 >= playlist.length) {
    playNum = 0
  } else {
    playNum++
  }
  initCurrent()
}

function playPrev() {
  if (playNum - 1 < 0) {
    playNum = playlist.length - 1
  } else {
    playNum--
  }
  initCurrent()
}

function switchAudio() {
  const index = [...this.parentElement.childNodes].indexOf(this)
  playNum = index
  initCurrent()
}

function scrub(e) {
  const scrubTime =
    (e.offsetX / audioProgressEl.offsetWidth) * curAudio.duration
  curAudio.currentTime = scrubTime
  audioProgressFillEl.classList.add('active')

  setTimeout(() => {
    audioProgressFillEl.classList.remove('active')
  }, 500)
}

function initPlaylist() {
  playlistEl.innerHTML = `${
    playlist.length > 0
      ? playlist
          .map(
            item =>
              `<li class="playlist-item" data-id="${item.id}">
               ${item.id}.
              <div class="playlist-item__name">${item.title}</div>
            </li>`
          )
          .join('')
      : '---'
  }`
}

const audioVolumeRange = document.querySelector('#audioVolumeRange')

audioVolumeRange.addEventListener('input', e => {
  const input = e.target
  input.style.background = `linear-gradient(to right, #d8d8d8 0%, #d8d8d8 ${
    input.value * 70
  }%, #383838 ${input.value * 100}%, #383838 100%)`
  curAudio.volume = input.value
})

audioPlayMain.addEventListener('click', togglePlay)
audioNextMain.addEventListener('click', playNext)
audioPrevMain.addEventListener('click', playPrev)
curAudio.addEventListener('timeupdate', updateProgress)
playlistItemsEls.forEach(item => {
  item.addEventListener('click', switchAudio)
})
audioProgressEl.addEventListener('click', scrub)
