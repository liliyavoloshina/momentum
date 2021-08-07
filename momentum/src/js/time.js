const time = document.querySelector('.time')
function showTime() {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  if (time) {
    time.textContent = currentTime
  }
  setTimeout(showTime, 1000)
}

export { showTime }
