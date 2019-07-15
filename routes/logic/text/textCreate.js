const Text = require('../../../models/TextModel');

const textCreate = (req, res, next) => {
    Text.findOne({where: {fileName: req.body.fileName}})
    .then(text => {
        if (text) {
            return res.status(400).json({
                text: 'Text already exists'
            });
        } else {

            Text.create({
                name: req.body.name,
                email: req.body.email,
                fileName: req.body.fileName,
                fileUrl: req.body.fileUrl,
                originalLanguage: req.body.originalLanguage,
                translationLanguage: req.body.translationLanguage,
                extraReview: req.body.extraReview,
                translationSpeed: req.body.translationSpeed,
                tags: req.body.tags,
                progress: '0',
                collectionName: '',
                currentTranslator: '',
                date: Date.now(),
                isReady:false
            });

            res.json(req.body);
        }
    })
}

module.exports = textCreate