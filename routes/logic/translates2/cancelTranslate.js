const Translate = require('../../../models/TranslateModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const nodemailer = require('nodemailer');

const cancelTranslate =(req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ltr24650@gmail.com',
            pass: 'ltr2019ltr'
        }
    });

    const mailOptions = {
        from: 'ltr24650@gmail.com',
        to: req.body.translatorEmail,
        subject: 'Your transfer has been canceled',
        text: `The customer (${req.body.customerName}) canceled the transfer and refunded 50% 
        of the order amount, check your profile information. Sorry for your time.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    Translate.findOne({
        where: {
            id: req.body.id
        }
    })
        .then((translate) => {
            console.log(translate)
            translate.destroy()
            }

        )
        .then(() => res.json(req.body))
};

module.exports = cancelTranslate