// dragAndDrop.jsx
import { useState } from 'react';

export function useDragAndDrop(todos, setTodos) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(index, 0, removed);
    setTodos(updatedTodos);
    setDraggedIndex(null);
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