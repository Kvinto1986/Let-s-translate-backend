const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
    data.languages = !isEmpty(data.languages) ? data.languages : '';


    if (!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 to 30 chars';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 40})) {
        errors.password = 'Password must have 6 chars';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password_confirm, {min: 6, max: 40})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    if (data.languages.length === 0 && Array.isArray(data.languages)) {
        errors.languages = 'Languages is required';
    }

    if (!Array.isArray(data.languages)) {
        errors.languages = 'Wrong language value';
    }

    if (Array.isArray(data.languages) && data.languages.length > 0) {

        const validlanguages = ["English", "Russian", "Spanish", "Deutsch", "Polish", "Japanese", "Chinese", "Hindi", "Portuguese", "French", "Italian"];

        let confirm = true;

        for (let i = 0; i < data.languages; i++) {
            if (validlanguages.includes(data.languages[i])) {
                confirm = true;
            } else {
                confirm = false;
                errors.languages = 'Wrong language value';
                break
            }

        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};