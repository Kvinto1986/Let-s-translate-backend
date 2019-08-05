const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateText(data) {
    let errors = {};
    data.originalLanguage = !isEmpty(data.originalLanguage) ? data.originalLanguage : '';
    data.translationLanguage = !isEmpty(data.translationLanguage) ? data.translationLanguage : '';
    data.tags = !isEmpty(data.tags) ? data.tags : '';
    data.cost = !isEmpty(data.cost) ? data.cost : '';

    if (data.tags.length === 0 && Array.isArray(data.tags)) {
        errors.tags = 'Tags is required';
    }

    if (!Array.isArray(data.tags)) {
        errors.tags = 'Wrong Tags value';
    }

    if (Array.isArray(data.tags) && Array.isArray(data.tags) > 0) {

        const validlanguages = ["medicine", "science", "equipment", "culture", "art", "Japanese", "history"];

        let confirm = true;

        for (let i = 0; i < data.tags; i++) {
            if (validlanguages.includes(data.tags[i])) {
                confirm = true;
            } else {
                confirm = false;
                errors.tags = 'Wrong language value';
                break
            }

        }
    }


    if (data.cost === 0) {
        errors.cost = 'Order cost is required';
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


    if (data.translationLanguage) {

        const validlanguages = ["English", "Russian", "Spanish", "Deutsch", "Polish", "Japanese", "Chinese", "Hindi", "Portuguese", "French", "Italian"];


        if (!validlanguages.includes(data.translationLanguage)) {
            errors.translationLanguage = 'Wrong language value';
        }
    }

    if (data.originalLanguage) {

        const validlanguages = ["English", "Russian", "Spanish", "Deutsch", "Polish", "Japanese", "Chinese", "Hindi", "Portuguese", "French", "Italian"];


        if (!validlanguages.includes(data.originalLanguage)) {
            errors.originalLanguage = 'Wrong language value';
        }
    }



return {
    errors,
    isValid: isEmpty(errors)
}
}
