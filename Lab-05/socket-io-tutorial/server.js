const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Socket IO Codes
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on("chat message", (msg) => {
        console.log(`Message received: ${msg}`);
        io.emit('chat message:', msg); // This will broadcast the message to all connected clients
    });
});