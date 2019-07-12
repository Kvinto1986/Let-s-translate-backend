const Text = require('../../../models/TextModel');

const getTextCustomers = (req, res) => {

    Text.findAll({
        where: {
            email: req.body.email, 
            collectionName: req.body.collectionName
        }})
    .then(result => {
        res.json(result);
    })
}

module.exports = getTextCustomers