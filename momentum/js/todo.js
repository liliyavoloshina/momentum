import { changeInputColor } from './helpers.js'
const todoOpenBtn = document.querySelector('#todoBtn')
const todoArea = document.querySelector('#todoArea')
const todoNameSelects = document.querySelectorAll('input[data-todolist]')
const todolists = document.querySelectorAll('ul[data-todolist]')
const todoNewInputs = document.querySelectorAll('.todolist-new')


let currentTodolistName = 'inbox'

function toggleTodoArea() {
  todoOpenBtn.classList.toggle('revert')
  todoArea.classList.toggle('show')
}

function changeTodolist() {
  currentTodolistName = this.dataset.todolist
  todolists.forEach(todolist => todolist.dataset.todolist === currentTodolistName ? todolist.classList.remove('hidden') : todolist.classList.add('hidden'))
}

todoOpenBtn.addEventListener('click', toggleTodoArea)
todoNameSelects.forEach(select => select.addEventListener('change', changeTodolist))
todoNewInputs.forEach(input => input.addEventListener('focus', e => changeInputColor(e)))
todoNewInputs.forEach(input => input.addEventListener('blur', e => changeInputColor(e)))