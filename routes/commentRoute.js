const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const express = require('express');
const router = express.Router();

const Comment = require('../models/CommentModel');

const validateMessage = require('../validation/messageValidation');

router.post('/registration', function (req, res) {

    console.log(req.body)
    const {errors, isValid} = validateMessage(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Comment.create({
        textId: req.body.textId,
        senderEmail: req.body.senderEmail,
        senderName: req.body.senderName,
        commentText: req.body.messageText,
        date: Date.now()
    })
        .then(result => res.json(result))
});

router.post('/getComments', (req, res) => {
    Comment.findAll({
        where: {
            textId: req.body.textId
        }
    })
        .then((comments) => {
            res.json(comments)
        })
});


module.exports = router;