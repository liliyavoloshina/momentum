import {setBg} from './slider.js'

const widgetsRadios = document.querySelectorAll('.source-radio')

let source

function changeSource() {
  source = this.dataset.source
  setSourceToStorage()
  setBg()
}

function getSourceFromStorage() {
  if (localStorage.getItem('source')) {
    return JSON.parse(localStorage.getItem('source'))
  } else {
    return 'github'
  }
}

function setSourceToStorage() {
  localStorage.setItem('source', JSON.stringify(source))
}

window.addEventListener('load', () => {
  source = getSourceFromStorage()
  widgetsRadios.forEach(radio => {
    radio.dataset.source === source ? radio.checked = true : radio.checked = false
  })
})

widgetsRadios.forEach(radio => {
  radio.addEventListener('change', changeSource)
})

export {getSourceFromStorage}