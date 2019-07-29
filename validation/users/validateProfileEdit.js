const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateProfileEdit(data) {
    let errors = {};
    if(!Validator.isEmail(data.email) && data.email.length > 0) {
        errors.email = 'Email is invalid';
    }

    if(!Validator.isEmpty(data.name) && data.name.length > 0) {
        errors.name = 'Name is invalid';
    }

    if(!Validator.isLength(data.name, {min: 2, max: 30}) && data.name.length > 0) {
        errors.name = 'Name must have from 2 to 30';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30}) && data.password.length > 0) {
        errors.password = 'Password must have 6 chars';
    }

    if(!Validator.isLength(data.passwordCur, {min: 6, max: 30})) {
        errors.passwordCur = 'Password must have at list 6 chars';
    }

    if(Validator.isEmpty(data.passwordCur)) {
        errors.password_cur = 'Current password is required';
    }
    
    // Object.values(data)
    // .filter(value => value === '') {

    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}