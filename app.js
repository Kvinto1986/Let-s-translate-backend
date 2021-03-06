const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");

const users = require('./routes/usersRoute');
const customers = require('./routes/customersRoute');
const texts = require('./routes/textRoute');
const uploads = require('./routes/uploadRoute');
const messages = require('./routes/messageRoute');
const translates = require('./routes/translateRoute');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/texts', texts);
app.use('/api/uploads', uploads);
app.use('/api/messages', messages);
app.use('/api/translates', translates);

const PORT = process.env.PORT || 5000;

const server = app.listen(4000);
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

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
