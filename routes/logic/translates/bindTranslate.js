const Text = require('../../../models/TextModel');
const Translate = require('../../../models/TranslateModel');

const bindTranslate = (req, res, next) => {

    Text.update(
        {currentTranslator: req.body.translatorEmail},
        {where: {id: req.body.textId}}
    )
    .then(() => {
        Translate.create(req.body)
        .then(() => {
            res.json('Translate was binded')
        })
    })
    .catch(err => console.log(err))
}

module.exports = bindTranslate