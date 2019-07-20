const Translate = require('../../../models/TranslateModel');

const payTranslate = (req, res, next) => {
    
    Translate.findOne({where: {id: req.body.id}})
    .then(translate => {
        translate.isPaid = true;
        translate.save()
        res.json(translate)
    })
}

module.exports = payTranslate;