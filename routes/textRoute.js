const express = require('express');
const router = express.Router();

const Text = require('../models/TextModel');

const validateText = require('../validation/textValidation');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateText(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    Text.findOne({where: {fileName: req.body.fileName}})
        .then(text => {
            if (text) {
                return res.status(400).json({
                    text: 'Text already exists'
                });
            } else {
                const newText = new Text({
                    name: req.body.name,
                    email: req.body.email,
                    fileName: req.body.fileName,
                    fileUrl: req.body.fileUrl,
                    originalLanguage: req.body.originalLanguage,
                    translationLanguage: req.body.translationLanguage,
                    extraReview: req.body.extraReview,
                    translationSpeed: req.body.translationSpeed,
                    tags: req.body.tags,
                    date: Date.now()
                });

                Text.create(newText);
                res.json(newText)
            }
        })

});

module.exports = router;