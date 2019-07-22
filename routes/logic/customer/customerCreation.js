const bcrypt = require('bcryptjs');
const Customer = require('../../../models/CustomerModel');

const customerCreation = (req, res, next) => {
    const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        verify: false,
        texts: [],
        creditCard: req.body.creditCard,
        role: req.body.role,
        languages: req.body.languages,
        date: Date.now()
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                if (err) console.error('There was an error', err);
                else {
                    newCustomer.password = hash;
                    newCustomer
                    .save()
                    .then(user => {
                        res.json(user)
                    });
                }
            });
        }
    });

    Customer.create(newCustomer);
    res.json(newCustomer)
}

module.exports = customerCreation