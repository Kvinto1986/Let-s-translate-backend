const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessage(data) {
    let errors = {};

    data.messageText = !isEmpty(data.messageText) ? data.messageText : '';

    if(Validator.isEmpty(data.messageText)) {
        errors.messageText = 'Text is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};