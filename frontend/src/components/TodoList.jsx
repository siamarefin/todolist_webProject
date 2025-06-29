import React from 'react';
import { useDragAndDrop } from './dragAndDrop';

function TodoList({ todos, onToggleDone, onDelete, setTodos }) {
  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd } = useDragAndDrop(todos, setTodos);

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map((todo, index) => (
        <li
          key={index}
          draggable
          onDragStart={e => handleDragStart(e, index)}
          onDragOver={e => handleDragOver(e, index)}
          onDrop={e => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            background: '#fff',
            marginBottom: 10,
            padding: '10px 12px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            textDecoration: todo.done ? 'line-through' : 'none',
            opacity: todo.done ? 0.6 : 1
          }}
        >
          <span style={{
            flex: 1,
            fontWeight: 'bold',
            color: todo.done ? 'green' : 'blue'
          }}>
            {todo.task}
          </span>
          <span style={{
            fontSize: '0.9em',
            color: '#888',
            margin: '0 10px'
          }}>
            {todo.date}
          </span>
          <button
            onClick={() => onToggleDone(index)}
            style={{
              marginRight: 8,
              padding: '6px 12px',
              borderRadius: 4,
              background: todo.done ? '#333' : '#007bff',
              color: '#fff',
              border: 'none'
            }}
          >
            {todo.done ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => onDelete(index)}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              background: '#dc3545',
              color: '#fff',
              border: 'none'
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;