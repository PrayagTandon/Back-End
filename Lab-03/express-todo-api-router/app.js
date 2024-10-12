const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Miidleware to Parse the JSON requests
app.use(bodyParser.json());

// Importing the tasks router
const taskRouter = require('./tasks');

// Using the tasks router for routes starting with '/tasks'
app.use('/tasks', taskRouter);

// Defining the PORT for the server (Defining the fallback port to be 3000)
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});