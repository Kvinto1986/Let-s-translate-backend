const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/loginValidation');
const validateUserInput = require('../validation/userValidation');

const User = require('../models/UserModel');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user) {
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

                const newUser = new User({
                    role: req.body.role,
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    verify: false,
                    orders: [],
                    date:Date.now()
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) console.error('There was an error', err);
                            else {
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    });
                            }
                        });
                    }
                });

                User.create(newUser);
                res.json(user)
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

    User.findOne({where: {email: email}})
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            role: user.role,
                            orders: user.orders,
                            phone: user.phone,
                            email: user.email,
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