const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateText(data) {
    let errors = {};
    data.originalLanguage = !isEmpty(data.originalLanguage) ? data.originalLanguage : '';
    data.translationLanguage = !isEmpty(data.translationLanguage) ? data.translationLanguage : '';
    data.tags = !isEmpty(data.tags) ? data.tags : '';

    if (data.tags[0] === undefined) {
        errors.tags = 'Tags is required';
    }

    if (data.translationLanguage === data.originalLanguage) {
        errors.originalLanguage = 'Original and translation languages must be different';
        errors.translationLanguage = 'Original and translation languages must be different';
    }

    if (Validator.isEmpty(data.originalLanguage)) {
        errors.originalLanguage = 'Original language is required';
    }

    if (Validator.isEmpty(data.translationLanguage)) {
        errors.translationLanguage = 'Translation language is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};