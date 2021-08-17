const todoOpenBtn = document.querySelector('#todoBtn')
const todoArea = document.querySelector('#todoArea')

function toggleTodoArea() {
  todoOpenBtn.classList.toggle('revert')
  todoArea.classList.toggle('show')
}

todoOpenBtn.addEventListener('click', toggleTodoArea)