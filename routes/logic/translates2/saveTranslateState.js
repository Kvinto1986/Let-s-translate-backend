const Translate = require('../../../models/TranslateModel');

const saveTranslateState = (req, res, next) => {
    Translate.findOne({where: {textId: req.body.textId}})
    .then(translate => {
        translate.update(req.body)
        .then(() => res.json('Translate save updated'))
    })
    .catch(err => {
        console.log("err");
    })
}

module.exports = saveTranslateState