import { changeLang } from './lang.js'

const settingBtn = document.querySelector('#settingBtn')
const settingArea = document.querySelector('#settingArea')
const langInputs = document.querySelectorAll('input[name="lang"]')

function toggleSetting() {
  settingBtn.classList.toggle('revert')
  settingArea.classList.toggle('show')
}

settingBtn.addEventListener('click', toggleSetting)
langInputs.forEach(input => {
  input.addEventListener('change', changeLang)
})
