const Text = require('../../../models/TextModel');

const bindTranslate = (req, res, next) => {
    const {translatorEmail, translateID} = req.body

    Text.update(
        {currentTranslator: translatorEmail},
        {where: {id: translateID}}
    )
    .then(() => {
        res.json('Translate was binded')
    })
    .catch(err => console.log(err))
}

module.exports = bindTranslate