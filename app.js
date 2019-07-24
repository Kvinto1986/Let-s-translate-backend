const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");

const users = require('./routes/usersRoute');
const customers = require('./routes/customersRoute');
const texts = require('./routes/textRoute');
const uploads = require('./routes/uploadRoute');
const messages = require('./routes/messageRoute');
const comments = require('./routes/commentRoute');
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
app.use('/api/comments', comments);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
