import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList.jsx';
import { fetchTodos, addTodoAPI, updateTodoAPI, deleteTodoAPI } from './utils/api';
import {reorderTodosAPI} from './utils/api'; // Import reorder function



function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos().then(setTodos);
    }, []);
    
    const handleReorder = async (newTodos) => {
        setTodos(newTodos);
        await reorderTodosAPI(newTodos.map(todo => todo._id));
    }

    const addTodo = async () => {
        if(!task.trim()) return;
        const newTodo = { task, date: new Date().toLocaleString(), done: false };
        const saved = await addTodoAPI(newTodo);
        setTodos([...todos, saved]);
        setTask('');
    };

    const toggleDone = async (index) => {
        const todo = todos[index];
        const updated = { ...todo, done: !todo.done };
        const saved = await updateTodoAPI(todo._id, updated);
        const updatedTodos = [...todos];
        updatedTodos[index] = saved;
        setTodos(updatedTodos);
    };

    const deleteTodo = async (index) => {
        const todo = todos[index];
        await deleteTodoAPI(todo._id);
        const updated = [...todos];
        updated.splice(index, 1);
        setTodos(updated);
    };

    return (
        <div className="App" >
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={ e => e.key === 'Enter' && addTodo()}
                    placeholder=" Add a new Task" 
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
                /> 
                <button onClick={addTodo} style={{ padding: '8px 16px', borderRadius: 4, background: '#007bff', color: '#fff', border: 'none' }}>
                    Add Task
                </button>
            </div>
            <TodoList
                todos={todos}
                onToggleDone={toggleDone}
                onDelete={deleteTodo}
                setTodos={setTodos}
                onReorder={handleReorder} // Pass reorder handler
            />
        </div>
    );
}

export default App;
