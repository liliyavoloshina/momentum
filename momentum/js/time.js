const timeEl = document.querySelector('#time')

function showTime() {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  timeEl.textContent = currentTime
  setTimeout(showTime, 1000)
}

showTime()
