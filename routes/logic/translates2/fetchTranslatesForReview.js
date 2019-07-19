const Translate = require('../../../models/TranslateModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const fetchTranslatesForReview = (req, res, next) => {
    Translate.findAll({
        where: {
            extraReview: true,
            isReady: true,
            isReviewed: false,
            originalLanguage: {
                [Op.in]: req.body.languages,
            },
            translationLanguage: {
                [Op.in]: req.body.languages,
            },
            translatorEmail: {
                [Op.ne]: req.body.translatorEmail
            }
        }
    })
    .then(transalates => {
        res.json(transalates)
    })
}

module.exports = fetchTranslatesForReview;