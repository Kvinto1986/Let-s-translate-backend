const Translate = require('../../../models/TranslateModel');

const finishTranslate = (req, res, next) => {
    Translate.findOne({where: {textId: req.body.textId}})
    .then(translate => {
        translate.update(req.body)
        .then(() => res.json('Translate succesfully finished!'))
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = finishTranslate