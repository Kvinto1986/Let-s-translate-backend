const express = require('express');
const router = express.Router();
const multer = require("multer");
const Customer = require('../models/CustomerModel');
const fs = require('file-system');
const firebase = require('firebase');
require ('firebase/auth');
require ('firebase/database');
require ('firebase/firestore');
require ('firebase/storage');
require ('firebase/messaging');
require ('firebase/functions');

const config=require('../firebaseConfig');
firebase.initializeApp(config);

router.post('/uploadOriginText', (req, res) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public')
        },
        filename: function (req, file, cb) {
            cb(null, req.headers.email + '-' + file.originalname)
        }
    });

    const upload = multer({storage}).single('file');

    const uniqueEmail = req.headers.email;

    Customer.findOne({where: {email: uniqueEmail}}).then(findSeller => {

        upload(req, res, function (err) {

            const path = req.file.path;
            const uniqueFilename = req.headers.email + '-' + req.file.originalname;

            console.log(req.file);

            const storageRef = firebase.storage().ref('texts/'+uniqueFilename);
            storageRef.child(path).put(req.file).then(function() {
                console.log('Uploaded a blob or file!');
            });
        })
    });
});


module.exports = router;