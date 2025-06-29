import { saveTodos } from '../utils/helper.js';
import { enableDragAndDrop } from './dragAndDrop.js';

export function renderTodoList(todoListElement, todos){
    // clear the existing list
    todoListElement.innerHTML = '';
    

    // render each todo item
    todos.forEach((todo, index) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = todo.task;
        taskSpan.style.color = todo.done ? 'green' : 'Black'; // gray for done tasks, black for active tasks
        taskSpan.style.fontWeight = 'bold';  // add some space between task and buttons

        if(todo.done){
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.6'; 
        }
        else 
        {
            li.style.textDecoration = 'none';
            li.style.opacity = '1';
        }


        

        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` (${todo.date})`;
        dateSpan.style.fontSize = '0.9em';
        dateSpan.style.color = '#888'; // gray color for the date
        dateSpan.style.marginLeft = '10px'; // add some space between task and date
        dateSpan.style.padding = '0 5px'; // add some padding for better spacing  

        const doneBtn = document.createElement('button');
        doneBtn.textContent = todo.done ? 'Undo' : 'Done';
        doneBtn.style.background = todo.done ? '#333' : '#007bff'; // dark for done, blue for not done
        doneBtn.onclick = () => {
        todo.done = !todo.done;
        saveTodos(todos); // save the updated todos to localStorage
        renderTodoList(todoListElement, todos); // re-render the list
        }; 

        // optional: add a delete button for each todo item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent='Delete';
        deleteBtn.style.background = todo.done? '#333' : 'red';
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            saveTodos(todos); // save the updated todos to localStorage
            renderTodoList(todoListElement, todos);
            
        };
        li.appendChild(taskSpan);
        li.appendChild(doneBtn);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);
        todoListElement.appendChild(li);

    });

    enableDragAndDrop(todoListElement, todos, saveTodos, renderTodoList); // enable drag and drop functionality 
}
