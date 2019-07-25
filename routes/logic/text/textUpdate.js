const Text = require('../../../models/TextModel');

const textUpdate = (req, res) => {

    if (req.body.originalLanguage === req.body.translationLanguage) {
        return res.status(400).json({
            language: 'Original and translation languages must be different'
        });
    }
    Text.findOne({
        where: {
            id: req.body.translateID
        }
    })
        .then(result => {
            result.originalLanguage = req.body.originalLanguage;
            result.translationLanguage = req.body.translationLanguage;
            result.extraReview = req.body.extraReview;
            result.translationSpeed = req.body.translationSpeed;
            result.charsCount = req.body.charsCount;
            result.tags = req.body.tags;

            if (req.body.fileName) {
                result.fileName = req.body.fileName;
            }

            if (req.body.fileUrl) {
                result.fileUrl = req.body.fileUrl;
            }

            result.save()
        })
        .then(() => res.json(req.body))
}

module.exports = textUpdate