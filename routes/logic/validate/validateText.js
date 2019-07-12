const textValidation = require('../../../validation/texts/textValidation')

const validateText = (req, res, next) => {
    const { errors, isValid } = textValidation(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next()
    }
}

module.exports = validateText