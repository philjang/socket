const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('hi', 'other user disconnected')
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg); // to server
        // // io.emit() method to send an event to everyone
        // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
        // example sending message to everyone, including sender
        io.emit('chat message', msg);
    });
    // // broadcast flag for sending message to everyone except for emitting socket
    socket.broadcast.emit('hi', `other user connected`);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});