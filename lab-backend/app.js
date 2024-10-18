const express = require('express');
const mongoose = require('mongoose');
const comments = require('./routes/comments');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/socialMedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database Connected Successfully!!'))
    .catch((err) => console.error(`Failed to connect to the Database: ${err}`))

app.use('/api/comments', comments);

app.listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`);
});