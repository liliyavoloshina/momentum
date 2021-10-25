import { setBg } from './slider.js'

const widgetsRadios = document.querySelectorAll('.source-radio')
const imageTagEl = document.querySelector('#photoTag')

let source
let tag

async function changeSource() {
  source = this.dataset.source
  setSourceToStorage()
  setBg()
}

function changeTag() {
  tag = this.value
  setTagToStorage()
  setBg()
}

function getSourceFromStorage() {
  if (localStorage.getItem('source')) {
    source = JSON.parse(localStorage.getItem('source'))
  } else {
    source = 'github'
  }
  return source
}

function getTagFromStorage() {
  if (localStorage.getItem('tag')) {
    tag = JSON.parse(localStorage.getItem('tag'))
    imageTagEl.value = tag
  } else {
    imageTagEl.value = ''
    tag = ''
  }
  if (source === 'github') {
    imageTagEl.value = '-'
    imageTagEl.disabled = true
  } else {
    imageTagEl.value = tag
    imageTagEl.disabled = false
  }
  return tag
}

function setSourceToStorage() {
  localStorage.setItem('source', JSON.stringify(source))
}

function setTagToStorage() {
  localStorage.setItem('tag', JSON.stringify(tag))
}

window.addEventListener('load', () => {
  tag = getTagFromStorage()
  source = getSourceFromStorage()
  widgetsRadios.forEach(radio => {
    radio.dataset.source === source ? (radio.checked = true) : (radio.checked = false)
  })
})

widgetsRadios.forEach(radio => {
  radio.addEventListener('change', changeSource)
})

imageTagEl.addEventListener('change', changeTag)

export { getSourceFromStorage, getTagFromStorage }
