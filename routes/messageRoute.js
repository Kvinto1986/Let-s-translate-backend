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
        messageText: req.body.messageText,
        senderSeen: true,
        recipientSeen: false,
        date: Date.now()
    });

    res.json(req.body);

});

module.exports = router;