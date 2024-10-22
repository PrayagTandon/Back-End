const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});