const Translate = require('../../../models/TranslateModel');
const nodemailer = require('nodemailer');

const reviewTranslate = (req, res, next) => {
    console.log(req.body)
    console.log('!!!!!!!!!!!!!!!!!!!')

    let resultRew = '';

    if (req.body.status) {
        resultRew = 'resolve';
    } else resultRew = 'reject';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ltr24650@gmail.com',
            pass: 'ltr2019ltr'
        }
    });

    const mailOptions = {
        from: 'ltr24650@gmail.com',
        to: req.body.data.translatorEmail,
        subject: `Review result text ${req.body.data.translatedfileName}`,
        text: `Result review your translation ${req.body.data.translatedfileName} from ${req.body.data.customerName} is: ${resultRew}
        ${req.body.reviewMessageData. messageText}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    Translate.findOne({where: {textId: req.body.data.textId}})
        .then(translate => {
            (req.body.status)
                ? (
                    // Success review
                    translate.update({isReviewed: true})
                        .then(() => {
                            res.json('Reviewed succeesfully')
                        })
                )
                : (
                    // Failed review
                    translate.update({
                        progress: 99,
                        isReady: false,
                        isReviewed: false,
                    })
                        .then(() => {
                            res.json('Review failed')
                        })
                )
        })
}

module.exports = reviewTranslate;