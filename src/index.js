const todoInput = documnet.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Add a new todo item
addBtn.addEventListener('click', ()=> {
    const task = todoInput.value.trim();
    if(task){
        const li = document.createElemnt('li');
        li.textContent = task;
        todoList.appendChild(li);
        todoInput.value = '';
        
    }
})