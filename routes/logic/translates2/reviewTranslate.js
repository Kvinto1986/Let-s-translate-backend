const Translate = require('../../../models/TranslateModel');

const reviewTranslate = (req, res,  next) => {
    Translate.findOne({where: {textId: req.body.data.textId}})
    .then(translate => {
        (req.body.status)
        ? (
            // Success review
            translate.update({isReviewed: true})
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