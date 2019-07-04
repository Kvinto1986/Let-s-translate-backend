const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCollection(data) {
    let errors = {};
    data.newCollectionName = !isEmpty(data.newCollectionName) ? data.newCollectionName : '';

    if (Validator.isEmpty(data.newCollectionName)) {
        errors.newCollectionName = 'Collection Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};