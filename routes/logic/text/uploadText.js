const Customer = require('../../../models/CustomerModel');
const multer = require("multer");
const fs = require("file-system");

const uploadText = (req, res, next) => {

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

    Customer.findOne({where: {email: uniqueEmail}})
    .then(findSeller => {
        upload(req, res, function (err) {
            const path = req.file.path;
            const uniqueFilename = req.headers.email + '-' + req.file.originalname;

            firebase
            .storage()
            .ref('texts/' + uniqueFilename)
            .child(path)
            .put(req.file)
            .then(() => {
                console.log('Uploaded a blob or file!');
            })
        })
    })
}

module.exports = uploadText