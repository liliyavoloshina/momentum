const settingBtn = document.querySelector('#settingBtn'),
  settingArea = document.querySelector('#settingArea'),
  todoOpenBtn = document.querySelector('#todoBtn'),
  todoPopup = document.querySelector('#todoPopup')

let isSettingOpen = false,
  isTodoOpen = false

function toggleSetting() {
  if (isTodoOpen) {
    toggleTodoArea()
  }
  settingBtn.classList.toggle('revert')
  settingArea.classList.toggle('show')
  isSettingOpen = !isSettingOpen
}

function toggleTodoArea() {
  if (isSettingOpen) {
    toggleSetting()
  }
  todoOpenBtn.classList.toggle('revert')
  todoPopup.classList.toggle('show')
  isTodoOpen = !isTodoOpen
}

window.addEventListener('click', (e) => {
  const target = e.target
  if (isTodoOpen && target !== todoPopup && !todoPopup.contains(target) && target !== todoOpenBtn) {
    toggleTodoArea()
  }
  if (isSettingOpen && target !== settingArea && !settingArea.contains(target) && target !== settingBtn) {
    toggleSetting()
  }
})

settingBtn.addEventListener('click', toggleSetting)
todoOpenBtn.addEventListener('click', toggleTodoArea)
