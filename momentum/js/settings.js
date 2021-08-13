const settingBtn = document.querySelector('#settingBtn')
const settingArea = document.querySelector('#settingArea')

function toggleSetting() {
  settingBtn.classList.toggle('revert')
  settingArea.classList.toggle('show')
}

settingBtn.addEventListener('click', toggleSetting)