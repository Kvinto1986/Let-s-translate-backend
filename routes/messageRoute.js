const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const express = require('express');
const router = express.Router();

const Message = require('../models/MessageModel');

const validateMessage = require('../validation/messageValidation');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateMessage(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Message.create({
        senderEmail: req.body.senderEmail,
        recipientEmail: req.body.recipientEmail,
        senderName: req.body.senderName,
        recipientName: req.body.recipientName,
        messageText: req.body.messageText,
        senderSeen: true,
        recipientSeen: false,
        date: Date.now()
    });

    res.json(req.body);
});


router.post('/getMessages', function (req, res) {

    const userEmail = req.body.email;

    Message.findAll({
        where: {
            senderEmail: userEmail
        }
    }).then((result) => {
        result.reverse();
        const uniqArr = [...new Set(result.map(s=>s.recipientEmail))]
            .map(recipientEmail=>{
            return{
                recipientEmail:recipientEmail,
                messageText:result.find(s=>s.recipientEmail===recipientEmail).messageText
            }
        });
        res.json(uniqArr);
    })
});

router.post('/getMessageHistory', function (req, res) {

    Message.findOne({where: {id: req.body.messagingID}})
    .then((messageUnit) => {
        res.json(messageUnit);
    })
});

module.exports = router;