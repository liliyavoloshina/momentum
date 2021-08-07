function setUsernameToStorage() {
  localStorage.setItem(
    'username',
    document.querySelector('#greetingName').value
  )
}

function getUsernameFromStorage() {
  if (localStorage.getItem('username')) {
    document.querySelector('#greetingName').value =
      localStorage.getItem('username')
  } else {
    document.querySelector('#greetingName').value = 'stranger'
  }
}

export { setUsernameToStorage, getUsernameFromStorage }
