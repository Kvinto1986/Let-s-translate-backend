const express = require('express');
const router = express.Router();

const Text = require('../models/TextModel');
const fetchTranslates = require('./logic/translates/fetchTranslates');
const fetchTranslateByID = require('./logic/translates/fetchTranslateByID');
const fetchCustomer = require('./logic/translates/fetchCustomer');
const compareResponce = require('./logic/translates/compareResponce');

router.post('/registration', function (req, res) {

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

router.post('/fetchByAvailableLanguages', fetchTranslates);
router.post('/fetchTranslateFullData', fetchTranslateByID, fetchCustomer, compareResponce);

module.exports = router;