const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser:true, 
    useUnifiedTopology: true
});

const todoShema = new mongoose.Schema({
    task: String,
    date:String,
    done: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});
app.post('/api/todos', async (req, res) => {
    const todo = new Todo.find();
    await todo.save();
    res.json(todo);

})

app.put('api/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({successs: true }); 
});

app.listen(5000, () => console.log('Server is running on port 5000')); 



