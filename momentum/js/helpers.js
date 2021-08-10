function changeInputColor(e) {
  if (e.target.classList.contains('input-inactive')) {
    e.target.classList.add('input-active')
    e.target.classList.remove('input-inactive')
  } else {
    e.target.classList.add('input-inactive')
    e.target.classList.remove('input-active')
  }
}

export { changeInputColor }