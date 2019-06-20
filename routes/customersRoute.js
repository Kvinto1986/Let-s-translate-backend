const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/loginValidation');
const validateCustomerInput = require('../validation/customerValidation');

const Customer = require('../models/CustomerModel');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateCustomerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findOne({
        email: req.body.email
    }).then(customer => {
        if (customer) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'managerjohnsnow@gmail.com',
                    pass: 'John1234567890Snow'
                }
            });

            const mailOptions = {
                from: 'managerJohnSnow@gmail.com',
                to: req.body.email,
                subject: 'You have successfully registered with the Let\'s translate!',
                text: `Congratulations!
                 You have successfully registered in our system, success in your work!
                 Your login: ${req.body.email}, Your password: ${req.body.password}.
                 All your data can be changed in your personal profile in the web application.
                 Best regards, Healthy Street Food Incentives.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            const newCustomer = new Customer({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                verify: false,
                texts: [],
                creditCard:req.body.creditCard,
                role:req.body.role
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
                                .then(customer => {
                                    res.json(customer)
                                });
                        }
                    });
                }
            });
            res.json(customer)
        }
    });
});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Customer.findOne({email})
        .then(customer => {
            if (!customer) {
                errors.email = 'Customer not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, customer.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: customer.id,
                            name: customer.name,
                            texts: customer.texts,
                            email: customer.email,
                            role: customer.role
                        };

                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);

                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;