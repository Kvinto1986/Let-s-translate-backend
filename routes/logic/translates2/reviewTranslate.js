const Translate = require('../../../models/TranslateModel');

const reviewTranslate = (req, res,  next) => {
    Translate.findOne({where: {textId: req.body.textId}})
    .then(translate => {
        (req.body.isReviewed)
        ? (
            // Success review
            translate.update(req.body)
            .then(() => {
                res.json('Reviewed succeesfully')
            })
        )
        : (
            // Failed review
            translate.update({
                progress: 99,
                isReady: false,
                isReviewed: false,
            })
            .then(() => {
                res.json('Review failed')
            })
        )
    })
}

module.exports = reviewTranslate;