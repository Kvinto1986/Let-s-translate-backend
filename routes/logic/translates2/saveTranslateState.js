const Translate = require('../../../models/TranslateModel');

const saveTranslateState = (req, res, next) => {
    Translate.findOne({where: {textId: req.body.textId}})
    .then(translate => {
        const progressOld = translate.progress
        const progressNew = req.body.progress

        if (progressOld === progressNew) {
            return res.status(400).json({
                progress: 'Change progress state, please'
            });
        }

        translate.update(req.body)
        .then(() => {
            const socketData = {
                textId: req.body.textId,
                customerEmail: req.body.customerEmail,
                customerName: req.body.customerName,
                textId: req.body.textId,
                translatorName: req.body.translatorName,
                progressOld,
                progressNew,
            }

            res.json(socketData)
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = saveTranslateState