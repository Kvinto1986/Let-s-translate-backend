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

                isReady: false,
                date: Date.now()
            })
            .then(() => {
                Text.findOne({
                    where: {
                        fileUrl: req.body.fileUrl,
                        originalLanguage: req.body.originalLanguage,
                        translationLanguage: req.body.translationLanguage,
                    }
                })
                .then(text => {
                    const socketData = {
                        textId: text.id,
                        languages: [req.body.originalLanguage, req.body.translationLanguage],
                        customerEmail: req.body.email,
                        customerName: req.body.name,
                        fileName: req.body.fileName
                    }
    
                    res.json(socketData);
                })
            })

        }
    })
}

module.exports = textCreate