export function enableDragAndDrop(todoListElement, todos, saveTodos, renderTodoList){
    let dragSrcIndex = null;

    Array.from(todoListElement.children).forEach((li, index) => {
        li.draggable = true; 
        li.addEventListener('dragstart', (event) => {
            dragSrcIndex = index; // store the index of the dragged item
            li.style.opacity = '0.4'; // make the dragged item semi-transparent
        });
        li.addEventListener('dragend', () => {
            li.style.opacity = '1'; // reset the opacity after dragging
        });
        li.addEventListener('dragover', (e) => {
            e.preventDefault();
            li.style.background = 'lightgray'; // highlight the drop target
        });
        li.addEventListener('dragleave', () => {
            li.style.background = ''; // reset the background when leaving the drop target
        });
        li.addEventListener('drop', (e) => {
            e.preventDefault();
            li.style.background = ''; // reset the background after dropping
            if (dragSrcIndex !== null && dragSrcIndex !== index) {
                const draggedTodo = todos[dragSrcIndex];
                todos.splice(dragSrcIndex, 1); // remove the dragged item from its original position
                todos.splice(index, 0, draggedTodo); // insert it at the new position
                saveTodos(todos); // save the updated todos to localStorage
                renderTodoList(todoListElement, todos); // re-render the list
            }
        });
    });
}