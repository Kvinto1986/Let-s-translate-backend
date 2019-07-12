const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Text = require('../models/TextModel');

const textCreate = require('./logic/text/textCreate')
const textUpdate = require('./logic/text/textUpdate')
const collectionChange = require('./logic/text/collectionChange')
const textDelete = require('./logic/text/textDelete')
const getAllCollections = require('./logic/text/getAllCollections')
const getTextCustomers = require('./logic/text/getTextCustomers')
const fetchTranslates = require('./logic/translates/fetchTranslates');
const fetchTranslateByID = require('./logic/translates/fetchTranslateByID');
const fetchCustomer = require('./logic/translates/fetchCustomer');
const compareResponce = require('./logic/translates/compareResponce');
const bindTranslate = require('./logic/translates/bindTranslate')
const fetchTranslatesForCurrentTranslator = require('./logic/translates/fetchTranslatesForCurrentTranslator')

const validateText = require('./logic/validate/validateText');
const validateCollection = require('./logic/validate/validateCollection')

router
.post('/registration', validateText, textCreate)
.post('/updateText', validateText, textUpdate)
.post('/changeCollection', validateCollection, collectionChange)
.delete('/deleteTexts', textDelete)
.post('/getAllCollections', getAllCollections)
.post('/getTextCustomers', getTextCustomers)
.post('/fetchByAvailableLanguages', fetchTranslates)
.post('/fetchTranslateFullData', fetchTranslateByID, fetchCustomer, compareResponce)
.post('/startTranslate', bindTranslate)
.post('/fetchTranslatesForCurrentTranslator', fetchTranslatesForCurrentTranslator)
.post('/fetchByAvailableLanguages', fetchTranslates)
.post('/fetchTranslateFullData', fetchTranslateByID, fetchCustomer, compareResponce)

module.exports = router;