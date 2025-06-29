import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList.jsx';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const addTodo = () => {
        if(!task.trim()) return; // prevent adding empty tasks
        setTodos([...todos, { task, date: new Date().toLocaleString(), done: false }]);
        setTask('');
    };

    const toggleDone = (index) => {
        const updated = [...todos];
        updated [index].done = !updated[index].done;
        setTodos(updated);
    };

    const deleteTodo = (index)  => {
        const updated = [...todos];
        updated.splice(index, 1);
        setTodos(updated);
    };
    return (
        <div className="App" >
            {/* <h2>Todo List </h2> */}
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
                />


        </div>
    );

}

export default App;     
