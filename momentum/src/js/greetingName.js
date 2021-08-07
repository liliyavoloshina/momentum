let username = document.querySelector('#greetingName').value

function changeName(e) {
  username = e.target.value
}

function setUsernameToStorage() {
  localStorage.setItem('username', username)
}

function getUsernameFromStorage() {
  if(localStorage.getItem('username')) {
    username = localStorage.getItem('username')
  }
}

window.addEventListener('beforeunload', setUsernameToStorage)
window.addEventListener('load', getUsernameFromStorage)

export default changeName