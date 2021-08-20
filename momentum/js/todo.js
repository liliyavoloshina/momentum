import { getLangFromStorage } from './helpers.js'
import { changeInputColor } from './helpers.js'

const todoOpenBtn = document.querySelector('#todoBtn')
const todoPopup = document.querySelector('#todoPopup')
const todoNameSelects = document.querySelectorAll('input[data-todolist]')
const todolists = document.querySelectorAll('ul[data-todolist]')
const todoNewInput = document.querySelector('#newtodo')

const inboxTitle = document.querySelector('.inbox-title')
const todayTitle = document.querySelector('.today-title')
const doneTitle = document.querySelector('.done-title')
const newTodoInput = document.querySelector('.new-todo-input')

let currentTodolistName = 'inbox'
let currentTodolistEl = document.querySelector('ul[data-todolist="inbox"]')
let todos
let openedMenu

function toggleTodoArea() {
  todoOpenBtn.classList.toggle('revert')
  todoPopup.classList.toggle('show')
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
  const btn = e.target
  const todoItem = btn.closest('.todo-item')
  const todoId = todoItem.attributes['data-todoid'].value
  const todoCategory = todoItem.attributes['data-category'].value
  const todoMenu = btn.parentElement.parentElement

  todoMenu.classList.add('hidden')

  let index = todos[todoCategory].findIndex(el => el.id == todoId)
  todos[todoCategory].splice(index, 1)

  let completedInbox = todos.inbox.filter(todo => todo.completed)
  let completedToday = todos.today.filter(todo => todo.completed)
  todos.done = completedInbox.concat(completedToday)

  setTodosToStorage()
  renderTodoList()
}

function editTodo() {
  const btn = this
  const todoItem = btn.closest('.todo-item')
  const todoItemText = todoItem.querySelector('.todo-item-text')
  const todoId = todoItem.attributes['data-todoid'].value
  const todoMenu = btn.parentElement.parentElement

  todoMenu.classList.add('todo-menu-hidden')

  todoItemText.disabled = false

  todoItemText.focus()
  let tmpStr = todoItemText.value
  todoItemText.value = ''
  todoItemText.value = tmpStr

  todoItemText.addEventListener('change', () =>
    changeTextTodoItem(todoItemText, todoId)
  )
}

function changeTextTodoItem(item, id) {
  const updatedTodos = todos[currentTodolistName].map(todo => {
    if (todo.id == id) {
      return {
        ...todo,
        text: item.value
      }
    }
    return todo
  })
  todos[currentTodolistName] = updatedTodos
  item.disabled = true

  let completedInbox = todos.inbox.filter(todo => todo.completed)
  let completedToday = todos.today.filter(todo => todo.completed)
  todos.done = completedInbox.concat(completedToday)

  setTodosToStorage()
  renderTodoList()
}

function moveTodo() {
  const btn = this
  const todoItem = btn.closest('.todo-item')
  const todoId = todoItem.attributes['data-todoid'].value
  const todoCategory = todoItem.attributes['data-category'].value
  const movedCategory = todoCategory == 'inbox' ? 'today' : 'inbox'

  const oldTodo = todos[todoCategory].find(el => el.id == todoId)
  const updatedTodo = { ...oldTodo, category: movedCategory }

  let index = todos[todoCategory].findIndex(el => el.id == todoId)
  todos[todoCategory].splice(index, 1)

  todos[movedCategory].push(updatedTodo)

  setTodosToStorage()
  renderTodoList()
}

function openMenuTodo(e) {
  const btn = e.target
  const menu = btn.parentNode.querySelector('.todo-menu')

  if (openedMenu && openedMenu != menu) {
    openedMenu.classList.add('todo-menu-hidden')
  }

  menu.classList.contains('todo-menu-hidden')
    ? menu.classList.remove('todo-menu-hidden')
    : menu.classList.add('todo-menu-hidden')
  openedMenu = menu
}

function renderTodoList() {
  currentTodolistEl.innerHTML =
    todos[currentTodolistName].length > 0
      ? todos[currentTodolistName]
          .map(
            todo => `
        <li class="todo-item ${
          todo.completed === true ? 'todo-item--completed' : ''
        }" data-todoid="${todo.id}" data-category="${todo.category}">
        
          <label class="checkbox-container">
            <input class="checkbox-input todo-checkbox" type="checkbox" data-id="${
              todo.id
            }" data-category="${todo.category}" ${
              todo.completed === true ? 'checked' : ''
            }>
            <span class="checkbox-checkmark"></span>
          </label>
          
          <input class="input todo-item-text" value="${todo.text}" disabled />
          <div class="todo-item-menu-area">
            <button class="todo-item-menu btn input-inactive" title="Todo Menu" data-id="${
              todo.id
            }" data-category="${todo.category}"></button>
            <div class="todo-menu todo-menu-hidden">
              <ul class="todo-menu-list">
                <li class="todo-item-edit ${
                  currentTodolistName === 'done' ? 'hidden' : ''
                }">
                  Edit
                </li>
                <li class="todo-item-move ${
                  currentTodolistName === 'done' ? 'hidden' : ''
                }">Move
                </li>
                <li class="todo-item-delete">
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </li>`
          )
          .join('')
      : `<div class="todolist-empty">
          <h3>${
            currentTodolistName === 'done'
              ? `<div class="todo-empty-done">You haven't completed any todo yet...</div>`
              : `<div class="todo-empty">Add a todo to get started!</div>`
          }</h3>
        </div>`

  const checkboxesTodo = document.querySelectorAll('.todo-checkbox')
  const menuTodoBtns = document.querySelectorAll('.todo-item-menu')
  const editTodoItem = document.querySelectorAll('.todo-item-edit')
  const deleteTodoItem = document.querySelectorAll('.todo-item-delete')
  const moveTodoItem = document.querySelectorAll('.todo-item-move')
  checkboxesTodo.forEach(checkbox =>
    checkbox.addEventListener('change', checkTodo)
  )
  menuTodoBtns.forEach(menu => menu.addEventListener('click', openMenuTodo))
  deleteTodoItem.forEach(btn => btn.addEventListener('click', deleteTodo))
  editTodoItem.forEach(btn => btn.addEventListener('click', editTodo))
  moveTodoItem.forEach(btn => btn.addEventListener('click', moveTodo))
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

function getTodoLang() {
  const lang = getLangFromStorage()

  const editTodoItem = document.querySelectorAll('.todo-item-edit')
  const deleteTodoItem = document.querySelectorAll('.todo-item-delete')
  const moveTodoItem = document.querySelectorAll('.todo-item-move')
  const todoEmptyDone = document.querySelector('.todo-empty-done')
  const todoEmpty = document.querySelector('.todo-empty')

  if (lang === 'ru') {
    inboxTitle.textContent = 'Общее'
    todayTitle.textContent = 'Сегодня'
    doneTitle.textContent = 'Выполнено'
    editTodoItem.forEach(item => (item.textContent = 'Изменить'))
    deleteTodoItem.forEach(item => (item.textContent = 'Удалить'))
    moveTodoItem.forEach(item => (item.textContent = 'Переместить'))
    todoEmptyDone ? todoEmptyDone.textContent = 'Вы еще ничего не выполнили...' : ''
    todoEmpty ? todoEmpty.textContent = 'Добавьте дело, чтобы начать!' : ''
    newTodoInput.placeholder = 'Новое дело...'
  } else {
    inboxTitle.textContent = 'Inbox'
    todayTitle.textContent = 'Today'
    doneTitle.textContent = 'Done'
    editTodoItem.forEach(item => (item.textContent = 'Edit'))
    deleteTodoItem.forEach(item => (item.textContent = 'Delete'))
    moveTodoItem.forEach(item => (item.textContent = 'Move'))
    todoEmptyDone ? todoEmptyDone.textContent = `You haven't completed any todo yet...` : ''
    todoEmpty ? todoEmpty.textContent = 'Add a todo to get started!' : ''
    newTodoInput.placeholder = 'New todo...'
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
  getTodoLang()
})

export { getTodoLang }
