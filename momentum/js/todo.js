import { changeInputColor } from './helpers.js'
const todoOpenBtn = document.querySelector('#todoBtn')
const todoArea = document.querySelector('#todoArea')
const todoNameSelects = document.querySelectorAll('input[data-todolist]')
const todolists = document.querySelectorAll('ul[data-todolist]')
const todoNewInputs = document.querySelectorAll('.todolist-new')

let currentTodolistName = 'inbox'
let currentTodolistEl = document.querySelector('ul[data-todolist="inbox"]')
let todos

function toggleTodoArea() {
  todoOpenBtn.classList.toggle('revert')
  todoArea.classList.toggle('show')
}

function changeTodolist() {
  currentTodolistName = this.dataset.todolist
  currentTodolistEl = document.querySelector(
    `ul[data-todolist="${currentTodolistName}"]`
  )
  todolists.forEach(todolist =>
    todolist.dataset.todolist === currentTodolistName
      ? todolist.classList.remove('hidden')
      : todolist.classList.add('hidden')
  )
  renderTodoList()
}

function renderTodoList() {
  currentTodolistEl.innerHTML =
    todos[currentTodolistName].length > 0
      ? todos[currentTodolistName].map(
          todo => `
      <li class="todo-item" data-id="${todo.id}">
        <input type="checkbox" checked=${todo.completed} />
        <div class="todo-item__name">${todo.text}</div>
      </li>`
        ).join('')
      : 'Empty'
}

function addNewTodo(e) {
  const input = e.target
  const todoCategory = input.dataset.todolist
  const todoText = input.value

  const newTodo = {
    id: todos[todoCategory].length + 1,
    text: todoText,
    completed: false
  }

  todos[todoCategory].push(newTodo)
  setTodosToStorage()
}

function setTodosToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromStorage() {
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'))
  } else {
    todos = {
      inbox: [],
      today: [],
      done: []
    }
  }
}

todoOpenBtn.addEventListener('click', toggleTodoArea)
todoNameSelects.forEach(select =>
  select.addEventListener('change', changeTodolist)
)
todoNewInputs.forEach(input =>
  input.addEventListener('focus', e => changeInputColor(e))
)
todoNewInputs.forEach(input =>
  input.addEventListener('blur', e => changeInputColor(e))
)
todoNewInputs.forEach(input =>
  input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      addNewTodo(e)
    }
  })
)
window.addEventListener('load', () => {
  getTodosFromStorage()
  renderTodoList()
})
