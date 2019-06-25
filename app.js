const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./routes/usersRoute');
const customers = require('./routes/customersRoute');
const texts = require('./routes/textRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/texts', texts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
