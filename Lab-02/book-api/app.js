// Setting up the app.js for Express and also importing the books module here

/*
    1. const express -> Done to require express in the project.
    2. const app -> Instance of the Express framework.
    3. const port -> Assign a port number to which express will listen for incoming requests. 
*/
const express = require('express');

const app = express();

const port = 3000;

const books = require('./modules/books');

// Middleware -> To parse JSON requests
app.use(express.json());

/*
(req,res) -> callback function that contsins two parameters: req(request) and res(response)
*/
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})