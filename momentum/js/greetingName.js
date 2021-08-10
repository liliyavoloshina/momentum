const nameEl = document.querySelector('#greetingName')
nameEl.addEventListener('focus', (e) => changeInputColor(e))
nameEl.addEventListener('blur', (e) => changeInputColor(e))


function setUsernameToStorage() {
  localStorage.setItem(
    'username',
    document.querySelector('#greetingName').value
  )
}

function getUsernameFromStorage() {
  if (localStorage.getItem('username')) {
    document.querySelector('#greetingName').value = localStorage.getItem('username')
  } else {
    document.querySelector('#greetingName').value = 'stranger'
  }
}

function changeInputColor(e) {
  if (e.target.classList.contains('name-inactive')) {
    e.target.classList.add('name-active')
    e.target.classList.remove('name-inactive')
  } else {
    e.target.classList.add('name-inactive')
    e.target.classList.remove('name-active')
  }
}

export { setUsernameToStorage, getUsernameFromStorage, changeInputColor }
