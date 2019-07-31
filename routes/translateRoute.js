const express = require('express');
const router = express.Router();
const fetchUnReadyTranslates = require('./logic/translates2/fetchUnReadyTranslates')
const saveTranslateState = require('./logic/translates2/saveTranslateState')
const finishTranslate = require('./logic/translates2/finishTranslate')
const getCustomersTranslates = require('./logic/translates2/getTranslatesForCustomer')
const validateTranslateSave = require('./logic/validate/validateTranslateSave')
const validateTranslateFinal = require('./logic/validate/validateTranslateFinal')
const fetchTranslatesForReview = require('./logic/translates2/fetchTranslatesForReview')
const reviewTranslate = require('./logic/translates2/reviewTranslate')
const payTranslate = require('./logic/translates2/payTranslate');
const cancelTranslate = require('./logic/translates2/cancelTranslate');

router
.post('/getCustomersTranslates', getCustomersTranslates)
.post('/fetchUnReadyTranslates', fetchUnReadyTranslates)
.post('/saveTranslate', validateTranslateSave, saveTranslateState)
.post('/finishTranslate', validateTranslateFinal, finishTranslate)
.post('/getTranslatesForReview', fetchTranslatesForReview)
.post('/translateReview', reviewTranslate)
.post('/payTranslate', payTranslate)
.post('/cancelTranslate', cancelTranslate);
module.exports = router;