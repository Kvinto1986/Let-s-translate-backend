const Text = require('../../../models/TextModel');

const fetchTranslatesForCurrentTranslator = (req, res) => {

    Text.findAll({where: {currentTranslator:req.body.translatorEmail}})
    .then(translates => {
        res.json(translates)
    })
    .catch(err => console.log(err))
}

module.exports = fetchTranslatesForCurrentTranslator