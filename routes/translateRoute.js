const express = require('express');
const router = express.Router();
const fetchUnReadyTranslates = require('./logic/translates2/fetchUnReadyTranslates')
const saveTranslateState = require('./logic/translates2/saveTranslateState')
const finishTranslate = require('./logic/translates2/finishTranslate')
const getCustomersTranslates = require('./logic/translates2/getTranslatesForCustomer')
const validateTranslateSave = require('./logic/validate/validateTranslateSave')
const validateTranslateFinal = require('./logic/validate/validateTranslateFinal')

router
.post('/getCustomersTranslates', getCustomersTranslates)
.post('/fetchUnReadyTranslates', fetchUnReadyTranslates)
.post('/saveTranslate', validateTranslateSave, saveTranslateState)
.post('/finishTranslate', validateTranslateFinal, finishTranslate)

module.exports = router;