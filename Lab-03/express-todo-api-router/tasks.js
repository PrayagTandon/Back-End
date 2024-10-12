const express = require('express');
const router = express.Router();

const tasks = []; // An array to store tasks

// Middleware to log incoming requests
router.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

// Defining the GET endpoint to retreive tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Defining the POST endpoint to create tasks - This POST request create tasks and ass them to the task array.
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const task = { title, description };
    tasks.push(task);
    res.status(201).json(task);
});

module.exports = router;