import { getLangFromStorage } from './helpers.js'
import playlist from '../data/playlist.js'

const audioPlayMain = document.querySelector('#audioPlayMain')
const audioNextMain = document.querySelector('#audioNextMain')
const audioPrevMain = document.querySelector('#audioPrevMain')
const audioNameEl = document.querySelector('#audioName')
const audioProgressEl = document.querySelector('#audioProgress')
const audioProgressFillEl = document.querySelector('#audioProgressFill')
const audioDurationEndEl = document.querySelector('#audioDurationEnd')
const audioDurationCurEl = document.querySelector('#audioDurationCur')
const audioVolumeRange = document.querySelector('#audioVolumeRange')
const audioVolumeBtn = document.querySelector('#audioVolumeBtn')
const playlistEl = document.querySelector('#playlist')

let lang = getLangFromStorage()

initPlaylist()

const playlistItemsEls = document.querySelectorAll('.playlist-item')

let isPlaying = false
let playNum = 0
let curAudioEl
let durationEnd = playlist[0].duration

// инициализация песни
const curAudio = new Audio()
curAudio.volume = 0.5
curAudio.src = playlist[playNum].src
curAudio.currentTime = 0
curAudio.dataset.id = playlist[playNum].id

curAudioEl = document.querySelector(`[data-id="${curAudio.dataset.id}"]`)
curAudioEl.classList.add('active')

audioNameEl.textContent = lang == 'en' ? playlist[playNum].title_en : playlist[playNum].title_ru
audioDurationEndEl.textContent = `00:${durationEnd}`

let audioPlaySmall = curAudioEl.querySelector('button')

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

function toggleSmallBtn() {
  if (isPlaying) {
    audioPlaySmall.classList.add('pause')
    audioPlaySmall.classList.remove('play')
  } else {
    audioPlaySmall.classList.remove('pause')
    audioPlaySmall.classList.add('play')
  }
}

async function changeAudioLang() {
  lang = getLangFromStorage()
  playlistItemsEls.forEach(item => lang == 'en' ? item.querySelector('.playlist-item__name').textContent = playlist[item.dataset.id - 1].title_en : item.querySelector('.playlist-item__name').textContent = playlist[item.dataset.id - 1].title_ru)
  audioNameEl.textContent = lang == 'en' ? playlist[playNum].title_en : playlist[playNum].title_ru
}

function togglePlay() {
  if (isPlaying) {
    curAudio.pause()
  } else {
    curAudio.play()
  }
  isPlaying = !isPlaying
  toggleMainBtn()
  toggleSmallBtn()
}

function initCurrent() {
  curAudioEl.classList.remove('active')
  audioPlaySmall.classList.remove('pause')
  audioPlaySmall.classList.add('play')
  audioPlaySmall.addEventListener('click', togglePlay)

  curAudio.src = playlist[playNum].src
  curAudio.currentTime = 0
  curAudio.dataset.id = playlist[playNum].id

  curAudioEl = document.querySelector(`[data-id="${curAudio.dataset.id}"]`)
  audioPlaySmall = curAudioEl.querySelector('button')

  curAudio.play()
  curAudioEl.classList.add('active')
  audioPlaySmall.classList.add('pause')
  audioPlaySmall.classList.remove('play')
  isPlaying = true
  toggleMainBtn()
  toggleSmallBtn()
  audioNameEl.textContent = lang == 'en' ? playlist[playNum].title_en : playlist[playNum].title_ru
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
  if (index === playNum) {
    return
  } else {
    playNum = index
    initCurrent()
  }
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

function volumeRegBtn() {
  if (curAudio.muted) {
    curAudio.muted = false
    audioVolumeBtn.style.backgroundImage = "url('/momentum/img/mute.png')"
  } else {
    curAudio.muted = true
    audioVolumeBtn.style.backgroundImage = "url('/momentum/img/volume.png')"
  }
}

function volumeRegRange(input) {
  input.style.background = `linear-gradient(to right, #d8d8d8 0%, #d8d8d8 ${
    input.value * 70
  }%, #383838 ${input.value * 100}%, #383838 100%)`
  curAudio.volume = input.value
}

function initPlaylist() {
  playlistEl.innerHTML = `${
    playlist.length > 0
      ? playlist
          .map(
            item =>
              `<li class="playlist-item" data-id="${item.id}">
              <button class="playlist-item__small-btn btn play" title="Play/Pause Audio"></button>
              <div class="playlist-item__name">${lang == 'en' ? item.title_en : item.title_ru}</div>
            </li>`
          )
          .join('')
      : '---'
  }`
}

audioVolumeRange.addEventListener('input', e => {
  const input = e.target
  volumeRegRange(input)
})
audioVolumeBtn.addEventListener('click', volumeRegBtn)
audioPlayMain.addEventListener('click', togglePlay)
audioPlaySmall.addEventListener('click', togglePlay)
audioNextMain.addEventListener('click', playNext)
audioPrevMain.addEventListener('click', playPrev)
curAudio.addEventListener('timeupdate', updateProgress)
playlistItemsEls.forEach(item => {
  item.addEventListener('click', switchAudio)
})
audioProgressEl.addEventListener('click', scrub)

export { changeAudioLang }
