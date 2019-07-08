const express = require('express');
const router = express.Router();
const fetchUnReadyTranslates = require('./logic/translates2/fetchUnReadyTranslates')
const saveTranslateState = require('./logic/translates2/saveTranslateState')
const finishTranslate = require('./logic/translates2/finishTranslate')
const validateTranslateSaveData = require('../validation/translates/validateTranslateSaveData')
const validateTranslateFinalData = require('../validation/translates/validateTranslateFinalData')

router
.post('/fetchUnReadyTranslates', fetchUnReadyTranslates)
.post('/saveTranslate', saveTranslateState)
.post('/finishTranslate', finishTranslate)

module.exports = router;