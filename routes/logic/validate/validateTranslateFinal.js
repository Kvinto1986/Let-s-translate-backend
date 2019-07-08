 const validateTranslateFinalData = require('../../../validation/translates/validateTranslateFinalData')

const validateTranslateFinal = (req, res, next) => {
    const { errors, isValid } = validateTranslateFinalData(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next()
    }
}

module.exports = validateTranslateFinal