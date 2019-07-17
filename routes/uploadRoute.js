const express = require('express');
const router = express.Router();
const firebase = require('firebase');
require ('firebase/auth');
require ('firebase/database');
require ('firebase/firestore');
require ('firebase/storage');
require ('firebase/messaging');
require ('firebase/functions');
const config = require('../firebaseConfig');
const uploadText = require('./logic/text/uploadText')

firebase.initializeApp(config);

router
.post('/uploadOriginText', uploadText)

module.exports = router;