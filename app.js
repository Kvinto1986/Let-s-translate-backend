const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./routes/usersRoute');
const customers = require('./routes/customersRoute');
const texts = require('./routes/textRoute');
const uploads = require('./routes/uploadRoute');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.static('public'));

app.use('/static', express.static('public'));
app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/texts', texts);
app.use('/api/uploads', uploads);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
