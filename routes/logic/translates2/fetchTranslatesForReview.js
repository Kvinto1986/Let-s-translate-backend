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
                [Op.in]: req.body,
            },
            translationLanguage: {
                [Op.in]: req.body,
            },
        }
    })
    .then(transalates => {
        console.log(transalates.length)
        res.json(transalates)
    })
}

module.exports = fetchTranslatesForReview;