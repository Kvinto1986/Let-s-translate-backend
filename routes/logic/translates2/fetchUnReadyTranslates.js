const Translate = require('../../../models/TranslateModel');

const fetchUnReadyTranslates = (req, res, next) => {

    Translate.findAll({where: {
        translatorEmail: req.body.translatorEmail,
        isReady: false 
    }})
    .then(translates => {
        res.json(translates)
    })
}

module.exports = fetchUnReadyTranslates