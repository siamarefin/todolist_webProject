import { renderTodoList } from "./components/TodoList.js";
import { saveTodos, loadTodos } from "./utils/helper.js";

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = loadTodos(); 
renderTodoList(todoList, todos);
// Add a new todo item
addBtn.addEventListener('click', ()=> {
    const task = todoInput.value.trim();
    if(task){
        const date = new Date().toLocaleString();
        todos.push({ task, date });
        saveTodos(todos);
        renderTodoList(todoList, todos);
        todoInput.value = ''; // clear the input field
    }
});