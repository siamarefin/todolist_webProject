// Utility for API calls
export const API_URL = 'http://localhost:5000/api/todos';

export async function fetchTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addTodoAPI(todo) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return res.json();
}

export async function updateTodoAPI(id, todo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });
  return res.json();
}

export async function deleteTodoAPI(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

export async function reorderTodosAPI(orderedIds) {
  const res = await fetch(`${API_URL}/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds })
  });
  return res.json();
}

