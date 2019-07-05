const Translate = require('../../../models/TranslateModel');

const saveTranslateState = (req, res, next) => {
    Translate.findOne({where: {}})
    .then(translate => {
        if(!translate) {
            Translate.create(req.body)
            .then(() => res.json('Translate saved'))
        }
        else {
            Translate.update(req.body)
            .then(() => res.json('Translate save updated'))
        }
    })
    .catch(err => {
        console.log("err");
    })
}

module.exports = saveTranslateState