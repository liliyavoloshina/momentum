import { changeInputColor } from './helpers.js'

const todoOpenBtn = document.querySelector('#todoBtn')
const todoArea = document.querySelector('#todoArea')
const todoNameSelects = document.querySelectorAll('input[data-todolist]')
const todolists = document.querySelectorAll('ul[data-todolist]')
const todoNewInput = document.querySelector('#newtodo')

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

function checkTodo(e) {
  const todoId = e.target.dataset.id
  const todoCategory = e.target.dataset.category
  let updatedTodos
  if (currentTodolistName === 'done') {
    updatedTodos = todos[todoCategory].map(todo => {
      if (todo.id == todoId) {
        return {
          ...todo,
          completed: false
        }
      }
      return todo
    })
    todos[todoCategory] = updatedTodos
  } else {
    updatedTodos = todos[currentTodolistName].map(todo => {
      if (todo.id == todoId) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
  }
  todos[currentTodolistName] = updatedTodos

  let completedInbox = todos.inbox.filter(todo => todo.completed)
  let completedToday = todos.today.filter(todo => todo.completed)
  todos.done = completedInbox.concat(completedToday)

  setTodosToStorage()
  renderTodoList()
}

function deleteTodo(e) {
  const todoId = e.target.dataset.id
  const todoCategory = e.target.dataset.category
  let index = todos[todoCategory].findIndex(el => el.id == todoId)
  todos[todoCategory].splice(index, 1)

  let completedInbox = todos.inbox.filter(todo => todo.completed)
  let completedToday = todos.today.filter(todo => todo.completed)
  todos.done = completedInbox.concat(completedToday)

  setTodosToStorage()
  renderTodoList()
}

function renderTodoList() {
  currentTodolistEl.innerHTML =
    todos[currentTodolistName].length > 0
      ? todos[currentTodolistName]
          .map(
            todo => `
        <li class="todo-item ${
          todo.completed === true ? 'todo-item--completed' : ''
        }" data-todoid="${todo.id}">
          <label class="checkbox-container">
          <div class="checkbox-additional-text">${todo.text}</div>
            <input class="checkbox-input todo-checkbox" type="checkbox" data-id="${
              todo.id
            }" data-category="${todo.category}" ${
              todo.completed === true ? 'checked' : ''
            }>
            <span class="checkbox-checkmark"></span>
          </label>
          <button class="todo-item-delete btn" title="Delete Todo" data-id="${
            todo.id
          }" data-category="${todo.category}"></button>
        </li>`
          )
          .join('')
      : `<div class="todolist-empty">
          <h3>${
            currentTodolistName === 'done'
              ? `You haven't completed any todo yet...`
              : 'Add a todo to get started!'
          }</h3>
        </div>`

  const checkboxesTodo = document.querySelectorAll('.todo-checkbox')
  const deleteTodoBtns = document.querySelectorAll('.todo-item-delete')
  checkboxesTodo.forEach(checkbox =>
    checkbox.addEventListener('change', checkTodo)
  )
  deleteTodoBtns.forEach(btn =>
    btn.addEventListener('click', deleteTodo)
  )
}

function addNewTodo(e) {
  const input = e.target
  const todoText = input.value
  let newTodo

  if (currentTodolistName === 'done') {
    newTodo = {
      id: Date.now(),
      text: todoText,
      category: 'inbox',
      completed: true
    }
    todos.inbox.push(newTodo)
  } else {
    newTodo = {
      id: Date.now(),
      text: todoText,
      category: currentTodolistName,
      completed: false
    }
  }

  todos[currentTodolistName].push(newTodo)
  setTodosToStorage()
  renderTodoList()
  input.value = ''
  input.blur()
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
todoNewInput.addEventListener('focus', e => changeInputColor(e))
todoNewInput.addEventListener('blur', e => changeInputColor(e))
todoNewInput.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    e.preventDefault()
    addNewTodo(e)
  }
})
window.addEventListener('load', () => {
  getTodosFromStorage()
  renderTodoList()
})
