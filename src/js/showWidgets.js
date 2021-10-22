const widgets = document.querySelectorAll('.widget')
const widgetsCheckboxes = document.querySelectorAll('.widget-checkbox')
const todoBtn = document.querySelector('#todoBtn')

console.log(widgets)

let hidden = []

function changeVisibilty() {
  const widget = this.dataset.widget
  const checked = this.checked
  const widgetEl = document.querySelector(`div[data-widget="${widget}"]`)
  widgetEl.classList.toggle('hidden')
  if (!checked) {
    hidden.push(widget)
  } else {
    const index = hidden.indexOf(widget)
    if (index > -1) {
      hidden.splice(index, 1)
    }
  }
  setHiddenToStorage()
}

function getHiddenFromStorage() {
  if (localStorage.getItem('hidden')) {
    hidden = JSON.parse(localStorage.getItem('hidden'))
  } else {
    hidden = []
  }
}

function setHiddenToStorage() {
  localStorage.setItem('hidden', JSON.stringify(hidden))
}

function checkHidden() {
  hidden.map(widgetName => {
    widgets.forEach(widget => {
      widget.dataset.widget === widgetName ? widget.classList.add('hidden') : ''
    })
  })
  widgetsCheckboxes.forEach(checkbox => {
    hidden.some(elem => elem == checkbox.dataset.widget) ? (checkbox.checked = false) : (checkbox.checked = true)
  })
}

window.addEventListener('load', () => {
  getHiddenFromStorage()
  checkHidden()
})

widgetsCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', changeVisibilty)
})
