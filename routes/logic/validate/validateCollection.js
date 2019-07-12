const collectionValidation = require('../../../validation/texts/collectionValidation')

const validateCollection = (req, res, next) => {
    const { errors, isValid } = collectionValidation(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next()
    }
}

module.exports = validateCollection