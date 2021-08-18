const todoOpenBtn = document.querySelector('#todoBtn')
const todoArea = document.querySelector('#todoArea')
const todoNameSelects = document.querySelectorAll('input[data-todolist]')
const todolists = document.querySelectorAll('ul[data-todolist]')

function toggleTodoArea() {
  todoOpenBtn.classList.toggle('revert')
  todoArea.classList.toggle('show')
}

function changeTodolist() {
  const todolistName = this.dataset.todolist
  const checked = this.checked
  todolists.forEach(todolist => todolist.dataset.todolist === todolistName ? todolist.classList.remove('hidden') : todolist.classList.add('hidden'))
}

todoOpenBtn.addEventListener('click', toggleTodoArea)
todoNameSelects.forEach(select => select.addEventListener('change', changeTodolist))