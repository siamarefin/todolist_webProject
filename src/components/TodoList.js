import { saveTodos } from '../utils/helper.js';

export function renderTodoList(todoListElement, todos){
    // clear the existing list
    todoListElement.innerHTML = '';

    // render each todo item
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if(todo.done){
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.6'; 
        }
        const taskSpan = document.createElement('span');
        taskSpan.textContent = todo.task;
        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` (${todo.date})`;
        dateSpan.style.fontSize = '0.9em';
        dateSpan.style.color = '#888'; // gray color for the date
        dateSpan.style.marginLeft = '10px'; // add some space between task and date
        dateSpan.style.padding = '0 5px'; // add some padding for better spacing  

        // optional: add a delete button for each todo item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent='Delete';
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            saveTodos(todos); // save the updated todos to localStorage
            renderTodoList(todoListElement, todos);
            
        };
        li.appendChild(taskSpan);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);
        todoListElement.appendChild(li);

    });
}