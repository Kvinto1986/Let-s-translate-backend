const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateTranslateFinalData(data) {
    let errors = {};
    data.progress = !isEmpty(data.progress) ? data.progress : '';
    data.translateText = !isEmpty(data.translateText) ? data.translateText : '';
    data.translatedfileName = !isEmpty(data.translatedfileName) ? data.translatedfileName : '';

    if (data.progress > 100 || data.progress < 0) {
        errors.progress = 'Invalid progress value';
    }

    if (Validator.isEmpty(data.translateText) && Validator.isEmpty(data.translatedfileName)) {
        errors.translateManage = 'nothing to finish';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};