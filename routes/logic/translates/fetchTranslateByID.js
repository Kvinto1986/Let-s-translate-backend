const Text = require('../../../models/TextModel');

const fetchTranslateByID = (req, res, next) => {
    Text.findOne({where: {id: req.body.id}})
    .then(translate => {
        req.translate = translate;
        next()
    })
};

module.exports = fetchTranslateByID;