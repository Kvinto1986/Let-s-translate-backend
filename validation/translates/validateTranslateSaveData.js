const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateTranslateSaveData(data) {
    let errors = {};
    data.progress = !isEmpty(data.progress) ? data.progress : '';
    data.translateText = !isEmpty(data.translateText) ? data.translateText : '';
    data.translatedfileName = !isEmpty(data.translatedfileName) ? data.translatedfileName : '';

    if (!Validator.isNumeric(data.progress) || data.progress > 100 || data.progress < 0) {
        errors.progress = 'Invalid progress value';
    }

    if (Validator.isEmpty(data.translateText) && Validator.isEmpty(data.translatedfileName)) {
        errors.translateManage = 'nothing to save'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};