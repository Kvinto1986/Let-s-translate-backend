const Text = require('../../../models/TextModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const fetchTranslates = (req, res, next) => {
    Text.findAll({
        where: {
            originalLanguage: {
                [Op.in]: req.body,
            },
            translationLanguage: {
                [Op.in]: req.body,
            },
        }
    })
    .then(translates => {   
        res.json(translates)
    })
    .catch(err => {
        res.json(err)
    })
};

module.exports = fetchTranslates;