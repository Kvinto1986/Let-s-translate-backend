const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Text = require('../models/TextModel');

const validateText = require('../validation/textValidation');
const validateCollection = require('../validation/collectionValidation')

const fetchTranslates = require('./logic/translates/fetchTranslates');
const fetchTranslateByID = require('./logic/translates/fetchTranslateByID');
const fetchCustomer = require('./logic/translates/fetchCustomer');
const compareResponce = require('./logic/translates/compareResponce');
const bindTranslate = require('./logic/translates/bindTranslate')
const fetchTranslatesForCurrentTranslator = require('./logic/translates/fetchTranslatesForCurrentTranslator')

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

                Text.create({
                    name: req.body.name,
                    email: req.body.email,
                    fileName: req.body.fileName,
                    fileUrl: req.body.fileUrl,
                    originalLanguage: req.body.originalLanguage,
                    translationLanguage: req.body.translationLanguage,
                    extraReview: req.body.extraReview,
                    translationSpeed: req.body.translationSpeed,
                    tags: req.body.tags,
                    progress: '0',
                    collectionName: '',
                    currentTranslator: '',
                    date: Date.now()
                });

                res.json(req.body);
            }
        })
});

router.post('/changeCollection', function (req, res) {

    const {errors, isValid} = validateCollection(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Text.findAll({
        where: {
            id: {
                [Op.in]: req.body.textsList
            }
        }
    }).then((texts) => {
            texts.forEach((elem) => {
                elem.collectionName = req.body.newCollectionName;
                elem.save()
            })
        }
    ).then(() => res.json(req.body))
});

router.post('/deleteTexts', function (req, res) {

    Text.findAll({
        where: {
            id: {
                [Op.in]: req.body.textsList
            }
        }
    }).then((texts) => {
            texts.forEach((elem) => {
                elem.destroy()
            })
        }
    ).then(() => res.json(req.body))
});

router.post('/getAllCollections', function (req, res) {

    Text.findAll({
        where: {
            email: req.body.email
        }
    })
        .then(result => {
            const uniqArr = [...new Set(result.map(s => s.collectionName))];
            res.json(uniqArr);
        })
});

router.post('/getTextCustomers', function (req, res) {

    Text.findAll({where: {email: req.body.email, collectionName: req.body.collectionName}})
        .then(result => {
            res.json(result);
        })
});

router
    .post('/fetchByAvailableLanguages', fetchTranslates)
    .post('/fetchTranslateFullData', fetchTranslateByID, fetchCustomer, compareResponce)
    .post('/startTranslate', bindTranslate)
    .post('/fetchTranslatesForCurrentTranslator', fetchTranslatesForCurrentTranslator);
router.post('/fetchByAvailableLanguages', fetchTranslates);
router.post('/fetchTranslateFullData', fetchTranslateByID, fetchCustomer, compareResponce);

module.exports = router;