const validateRegisterInput = require('../../../validation/customerValidation')

const validateCustomerRegistration = (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next()
    }
}

module.exports = validateCustomerRegistration