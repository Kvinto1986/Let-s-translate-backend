const Customer = require('../../../models/CustomerModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const confirming = (req, res, next) => {

    Customer.findOne({
        where: {
            [Op.or]: [
                {email: req.body.email}, 
                {creditCard: req.body.creditCard}
            ]
    }})
    .then(customer => {
        if (customer) {
            return res.status(400).json({
                email: 'Email or credit card already exists'
            });
        } 
        else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'managerjohnsnow@gmail.com',
                    pass: 'John1234567890Snow'
                }
            });

            let userData = req.body.creditCard + req.body.email

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(userData, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            userData = hash;
                            const mailOptions = {
                                from: 'managerJohnSnow@gmail.com',
                                to: req.body.email,
                                subject: 'You have successfully registered with the Let\'s translate!',
                                html: `<h1>Congratulations! You have successfully registered in our system, success in your work!</h1> <a href='https://letstranslate-app.herokuapp.com/confirm/${userData}'>Follow the link to confirm profile creation.</a>`
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    });
                }
            });

            next()
        }
    });
}

module.exports = confirming