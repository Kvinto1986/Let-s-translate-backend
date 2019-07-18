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
    })
    .then(result => res.json(result))
});


router.post('/getMessages', function (req, res) {

    const userEmail = req.body.email;
    
    Message.findAll({
        where: {
            senderEmail: userEmail
        }
    }).then((result) => {
        result.reverse();

        const uniqArr = [...new Set(result.map(s => s.recipientEmail))]
            .map(recipientEmail => {
                return {
                    recipientEmail: recipientEmail,
                    messageText: result.find(s => s.recipientEmail === recipientEmail).messageText,
                    senderEmail: result.find(s => s.recipientEmail === recipientEmail).senderEmail,
                    date: result.find(s => s.recipientEmail === recipientEmail).date,
                }
            });

        if (uniqArr.length === 0) {
            Message.findAll({
                where: {
                    recipientEmail: userEmail
                }
            })
            .then((result) => {

                const uniqArr = [...new Set(result.map(s => s.recipientEmail))]
                    .map(recipientEmail => {
                        return {
                            senderEmail: recipientEmail,
                            messageText: result.find(s => s.recipientEmail === recipientEmail).messageText,
                            recipientEmail: result.find(s => s.recipientEmail === recipientEmail).senderEmail,
                            date: result.find(s => s.recipientEmail === recipientEmail).date,
                        }
                    });

                res.json(uniqArr)
            });
        
        } else {
            for (let i = 0; i < uniqArr.length; i++) {

                Message.findAll({
                    where: {
                        senderEmail: uniqArr[i].recipientEmail,
                        recipientEmail: uniqArr[i].senderEmail
                    }
                })
                .then((data) => {
                    data.reverse();

                    const recipientUnreadedMessagesCount = data.filter(message => message.recipientSeen === false).length

                    const lastMessage = Array.from(data)[0];
                    if (lastMessage.date > uniqArr[i].date) {
                        uniqArr[i].recipientUnreadedMessagesCount = recipientUnreadedMessagesCount
                        uniqArr[i].messageText = lastMessage.messageText;
                        uniqArr[i].date = lastMessage.date;
                    }
                    if (i === uniqArr.length-1) {
                        res.json(uniqArr);
                    }
                })
            }
        }
    })
});

router.post('/getDialog', function (req, res) {
    
    const {recipientEmail, senderEmail} = req.body;

    let messagesArr = [];

    // Curent user's messages 
    Message.findAll({
        where: {
            recipientEmail: recipientEmail,
            senderEmail: senderEmail,
        }
    })
    .then((messages) => {
        messagesArr = messagesArr.concat(messages);
        
        // Recipient's messages
        Message.findAll({
            where: {
                recipientEmail: senderEmail,
                senderEmail: recipientEmail,
            }
        })
        .then((msgs) => {

            msgs.forEach(element => {
                Message.findOne({
                    where: {
                        id: element.id
                    }
                })
                .then(msg => {
                    
                    msg.update({recipientSeen: true})
                    .then(() => {
                        // Recipient's messages
                        Message.findAll({
                            where: {
                                recipientEmail: senderEmail,
                                senderEmail: recipientEmail,
                            }
                        })
                        .then(recMessages => {
    
                            messagesArr = messagesArr.concat(recMessages);
                            messagesArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    
                            res.json(messagesArr);
                        })
                    })
                })
            });
        })
    })
    .catch(err => {
        console.log(err)
    })
});

router.post('/fetchAllUnreadMessages', (req, res) => {
    Message
    .findAll({
        where: {
            recipientEmail: req.body.user.email,
            recipientSeen: false
        }
    })
    .then((message) => {
        res.json(message)
    })
})


router.post('/getMessageHistory', function (req, res) {
    Message
    .findOne({where: {id: req.body.messagingID}})
    .then((messageUnit) => {
        res.json(messageUnit);
    })
});

module.exports = router;