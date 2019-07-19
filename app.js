const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const server = app.listen(5000);
const io = require('socket.io').listen(server);

io.on("connection", socket => {

    socket.on('newTextData', data => {
        io.sockets.emit("newTextAlert", data);
    })
    
    socket.on('newTranslateStatusData', data => {
        io.sockets.emit("newTranslateStatusAlert", data);
    })

    socket.on('newUnReadMessage', data => {
        io.sockets.emit("spawnMessage", data);
    })

    socket.on('typingEcho', data => {
        io.sockets.emit("typing", data);
    })

    socket.on('stopTypingEcho', data => {
        io.sockets.emit("stopTyping", data);
    })

    socket.on('didMountUnreadMessageCountDiscard', data => {
        io.sockets.emit("unreadMessageCountDiscard", data);
    })
})

