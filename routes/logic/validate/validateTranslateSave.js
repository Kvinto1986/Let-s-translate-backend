const validateTranslateSaveData = require('../../../validation/translates/validateTranslateSaveData')

const validateTranslateSave = (req, res, next) => {
    const { errors, isValid } = validateTranslateSaveData(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next()
    }
}

module.exports = validateTranslateSave