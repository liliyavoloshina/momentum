const time = document.querySelector('.time')
const date = new Date()
const currentTime = date.toLocaleTimeString()

function showTime() {
  time.textContent = currentTime
}

export { showTime }
