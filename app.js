const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

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

