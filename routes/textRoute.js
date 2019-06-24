const express = require('express');
const router = express.Router();

const Text = require('../models/TextModel');

router.post('/registration', function (req, res) {
                console.log(req.body)

                Text.create({
                    name: req.body.name,
                    email: req.body.email,
                    fileName:req.body.fileName,
                    fileUrl:req.body.fileUrl,
                    originalLanguage:req.body.originalLanguage,
                    translationLanguage:req.body.translationLanguage,
                    extraReview:req.body.extraReview,
                    translationSpeed:req.body.translationSpeed,
                    tags:req.body.tags,
                    date: Date.now()
                });
});

module.exports = router;