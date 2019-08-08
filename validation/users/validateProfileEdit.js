const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateProfileEdit(data) {
    let errors = {};

    console.log(data)
    if (data.name.length > 0 && !(/^[a-zA-Z][a-zA-Z\s]+$/g.test(data.name))) {
        errors.name = 'Use only Latin symbols in name.'
    }

    if(data.name.length > 0 && !(/^[a-zA-Z]+$/g.test(data.name.charAt(0)))) {
        errors.name = 'Name should be started from any Latin symbol.'
    }

    if (data.creditCard!==''&&data.creditCard.length<16) {
        errors.creditCard = 'Invalid credit card number';
    }

    if (data.phone!==''&&data.phone.length<14) {
        errors.phone = 'Invalid phone number';
    }

    if (data.phone.length>14&&data.phone.split('')[1]==='0') {
        console.log(data.phone.split('')[1])
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        errors.phone = 'Invalid phone number';
    }

    if(data.name.length > 0 && data.name.length < 2) {
        errors.name = 'User name needs to contains at list 2 symbols'
    }
    if(!Validator.isEmail(data.email) && data.email.length > 0) {
        errors.email = 'Email is invalid';
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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}