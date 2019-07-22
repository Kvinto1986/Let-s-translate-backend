const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/loginValidation');
const validateCustomerInput = require('../validation/customerValidation');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const editProfileData = require('./logic/users/editProfileData')

const Customer = require('../models/CustomerModel');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateCustomerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Customer.findOne({where: {[Op.or]: [{email: req.body.email}, {creditCard: req.body.creditCard}]}})
        .then(customer => {
            if (customer) {
                return res.status(400).json({
                    email: 'Email or credit card already exists'
                });
            } else {

                let userData = req.body.creditCard + req.body.email;

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
                    html: `<h1>Congratulations! You have successfully registered in our system, success in your work!</h1> <a href='https://letstranslate-app.herokuapp.com/confirm/${req.body.creditCard + req.body.email}'>Follow the link to confirm profile creation.</a>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });



                bcrypt.genSalt(10, (err, salt) => {
                    if (err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(userData, salt, (err, hash) => {
                            if (err) console.error('There was an error', err);
                            else {
                                userData = hash;

                            }
                        });
                    }
                });

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
        });
});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Customer.findOne({where: {email: email}})
        .then(customer => {
            if (!customer) {
                errors.email = 'Customer not found';
                return res.status(404).json(errors);
            }
            if (customer.verify === false) {
                errors.confirmation = 'User is not confirmed, check your email';
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
                            role: customer.role,
                            creditCard: customer.creditCard,
                            date: customer.date
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

router
    .post('/edit', editProfileData)

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


router.post('/confirmationCustomer', (req, res) => {

    const isMatch = (user, data, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(data, hash)
                .then(isMatch => {
                    if (isMatch) {
                        resolve({
                            user,
                            isMatch: true
                        });
                    } else {
                        resolve({
                            user,
                            isMatch: false
                        })
                    }
                })
        });
    };

    Customer.findAll({where: {verify: false}})
        .then(customers => {

            let compareArray = [];

            customers.map(elem => {
                const userData = elem.creditCard + elem.email;
                compareArray.push(isMatch(elem, userData, req.body.hash));
            });

            Promise.all(compareArray)
                .then(users => {

                    const matchedUsers = users.filter(item => item.isMatch);
                    console.log(matchedUsers)
                    if (matchedUsers.length === 0) {
                        return res.status(400).json({
                            email: 'No'
                        });
                    } else {
                        res.json(matchedUsers[0].user);
                        Customer.findOne({where: {id: matchedUsers[0].user.id}}).then(customer => {
                            customer.verify = true;
                            customer.save()
                        })
                    }

                });
        })

});


router.post('/restorePassword', (req, res) => {

    Customer.findOne({where: {email: req.body.email}})
        .then(customer => {
            if (!customer) {
                return res.status(400).json({
                    restoreCustomer: 'Customer not found'
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
                    subject: 'Restore password',
                    html: `<h1>To change your password, follow the link</h1> <a href='https://letstranslate-app.herokuapp.com/newPassword/${customer.password}'>Restore password.</a>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.json(customer);

            }
        });
});

router.post('/newPassword', (req, res) => {
    Customer.findOne({where: {password: req.body.password}})
        .then(customer =>{
            if(customer){
                res.json(customer)}
            else res.status(400).json({
                email: 'No'
            });
        })
});

router.post('/editPassword', (req, res) => {

    if (req.body.password!==req.body.password_confirm) {
        res.status(400).json({
            password: 'Passwords do not match'
        });
    }

    else if (req.body.password.length<6) {
        res.status(400).json({
            password: 'Password must have more then 6 chars'
        });
    }

    else {
        Customer.findOne({where: {id: req.body.id}})
            .then(customer => {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) console.error('There was an error', err);
                            else {
                                customer.password = hash;
                                customer
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    });
                            }
                        });
                    }
                });
            });
    }
});

module.exports = router;