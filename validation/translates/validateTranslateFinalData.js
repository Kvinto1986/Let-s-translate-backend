const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateTranslateFinalData(data) {
    let errors = {};
    data.progress = !isEmpty(data.progress) ? data.progress : '';
    data.translateText = !isEmpty(data.translateText) ? data.translateText : '';
    data.translatedfileName = !isEmpty(data.translatedfileName) ? data.translatedfileName : '';

    if (!Validator.isNumeric(data.progress) || data.progress > 100 || data.progress < 0) {
        errors.progress = 'Invalid progress value';
    }

    if (Validator.isEmpty(data.translateText) && Validator.isEmpty(data.translatedfileName)) {
        errors.translateManage = 'Here is nothing to finish';
    }

    if(Validator.isEmpty(data.translatedfileName) && 
       (Validator.isEmpty(data.translateText) ||
       Validator.isEmpty(data.translateTextName))
    ) {
        errors.translateManage = 'If you are not load file, please, fill all inputs below';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};