const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://siam12:uWlfNq2Z8gdFmYNd@cluster0.qxwljgq.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const todoSchema = new mongoose.Schema({
    task: String,
    date: String,
    done: Boolean,
    order: Number // Add order field for drag and drop
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find().sort({ order: 1 }); // Sort by order
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    // Set order to the highest + 1
    const count = await Todo.countDocuments();
    const todo = new Todo({ ...req.body, order: count });
    await todo.save();
    res.json(todo);
});

app.put('/api/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


// Bulk update order of todos
app.put('/api/todos/reorder', async (req, res) => {
    const { orderedIds } = req.body; // Array of todo IDs in new order
    if (!Array.isArray(orderedIds)) {
        return res.status(400).json({ error: 'orderedIds must be an array' });
    }
    // Update each todo's order field
    await Promise.all(
        orderedIds.map((id, idx) =>
            Todo.findByIdAndUpdate(id, { order: idx })
        )
    );
    res.json({ success: true });
});


app.listen(5000, () => console.log('Server is running on port 5000'));



