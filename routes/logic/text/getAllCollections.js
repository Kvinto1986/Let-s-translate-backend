const Text = require('../../../models/TextModel');

const getAllCollections = (req, res) => {

    Text.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(result => {
        const uniqArr = [...new Set(result.map(s => s.collectionName))];
        
        res.json(uniqArr);
    })
}

module.exports = getAllCollections