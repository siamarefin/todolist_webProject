// dragAndDrop.jsx
import { useState } from 'react';
import { updateTodoAPI } from '../utils/api';

export function useDragAndDrop(todos, setTodos) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(index, 0, removed);
    setTodos(updatedTodos);
    setDraggedIndex(null);
    // Update order in DB after drag and drop
    for (let i = 0; i < updatedTodos.length; i++) {
      const todo = updatedTodos[i];
      await updateTodoAPI(todo._id, { ...todo, order: i });
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
}