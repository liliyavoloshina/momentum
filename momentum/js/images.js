import { setBg } from './slider.js'

const widgetsRadios = document.querySelectorAll('.source-radio')
const imageTagEl = document.querySelector('#photoTag')

let source
let tag

function changeSource() {
  source = this.dataset.source
  setSourceToStorage()
  setBg()
  tag = getTagFromStorage()
  if (source === 'github') {
    console.log(source, 'sourde = github')
    imageTagEl.value = '-'
    imageTagEl.disabled = true
  } else {
    imageTagEl.value = tag
    imageTagEl.disabled = false
  }
}

function changeTag() {
  tag = this.value
  setTagToStorage()
  setBg()
}

function getSourceFromStorage() {
  if (localStorage.getItem('source')) {
    return JSON.parse(localStorage.getItem('source'))
  } else {
    return 'github'
  }
}

function getTagFromStorage() {
 if (localStorage.getItem('tag')) {
    tag = JSON.parse(localStorage.getItem('tag'))
    imageTagEl.value = tag
    return tag
  } else {
    imageTagEl.value = 'nature'
    return 'nature'
  }
}

function setSourceToStorage() {
  localStorage.setItem('source', JSON.stringify(source))
}

function setTagToStorage() {
  localStorage.setItem('tag', JSON.stringify(tag))
}

window.addEventListener('load', () => {
  source = getSourceFromStorage()
  widgetsRadios.forEach(radio => {
    radio.dataset.source === source
      ? (radio.checked = true)
      : (radio.checked = false)
  })
  
  
})

widgetsRadios.forEach(radio => {
  radio.addEventListener('change', changeSource)
})

imageTagEl.addEventListener('change', changeTag)

export { getSourceFromStorage, getTagFromStorage }
