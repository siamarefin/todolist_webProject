const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json());
let task = JSON.parse(fs.readFileSync("data.json")); // Fixed the variable name

app.get("/tasks", (req, res) => {
    // get all tasks lists
    try {
      res.status(200).send(task);
    } catch (err) {
      res.status(500).send(err).json({ message: "Task cannot be fetched" });
    }
  });

app.get('/tasks/:id',(req,res) =>{
    const taskId =parseInt(req.params.id) ;
    const task  = tasks.find(task => task.id === taskId) ;
    if(task){
        res.json(task);
    }else{
        res.status(404).json({message:'Task not found'});
    }

}); 

app.post('/tasks', (req,res) => {
    const {title ,description, status} = req.body ;
    const newTask = {
        id: tasks.length + 1 , 
        title ,
        description ,
        status 
    };
    tasks.push(newTask) ;
    saveTasksToFile();
    res.status(201).json(newTask) ;
});

app.put('/tasks/:id',(req,res) => {
    const taskId = parseInt(req.params.id) ;
    const taskIndex  = tasks.findIndex(task => task.id === taskId) ;
    if(taskIndex !== -1 )
    {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...req.body
        };
        saveTasksToFile();
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasksToFile();
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Save tasks to data.json
function saveTasksToFile() {
    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
}


const PORT = process.env.PORT || 4000; // Define the port number

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the port number when the server starts
});
