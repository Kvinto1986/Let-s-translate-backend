const Translate = require('../../../models/TranslateModel');

const getCustomersTranslates = (req, res) => {

    Translate.findAll({where: {
            customerEmail: req.body.email,
        }})
        .then(translates => {
            res.json(translates)
        })
};

module.exports = getCustomersTranslates