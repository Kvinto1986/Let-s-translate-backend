const express = require('express');
const bcrypt = require('bcryptjs');

const validateProfileEdit = require('../../../validation/users/validateProfileEdit')
const Customer = require('../../../models/CustomerModel');
const User = require('../../../models/UserModel');

const editProfileData = (req, res, next) => {
    const {data, user} = req.body

    const { errors, isValid } = validateProfileEdit(data);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const {
        name, email, phone, creditCard, password, passwordCur
    } = data
    const dataForNewObject = [{name}, {email}, {phone}, {creditCard}, {password}]
    let userModel

    if(user.role === 'admin' || user.role === 'translator') {
        userModel = User
    }
    else if (user.role === 'customer') {
        userModel = Customer
    }

    userModel.findOne({where: {id: user.id}})
    .then(user => {
        if(user) {
            if(user.email === data.email) {
                errors.email = 'User with this email already exists';
                return res.status(400).json(errors);
            }
            
            bcrypt.compare(data.passwordCur, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const validData = dataForNewObject.filter(unit => Object.values(unit)[0])
                    let editedData = Object.assign({}, ...validData)

                    if(Object.values(editedData).length === 0) {
                        errors.common = 'Please, fill at list one input';
                        return res.status(400).json(errors);
                    }

                    if(editedData.password) {
                        bcrypt.genSalt(10, (err, salt) => {
                            if(err) console.error('There was an error', err);
                            else {
                                bcrypt.hash(password, salt, (err, hash) => {
                                    if(err) console.error('There was an error', err);
                                    else {
                                        editedData.password = hash
                                        user.update(editedData)
                                        .then(() => {
                                            res.json('Success')
                                        })
                                    }
                                });
                            }
                        })
                    }
                    else {
                        user.update(editedData)
                        .then(() => {
                            res.json('Success')
                        })
                    }
                }
                else {
                    errors.password_cur = 'Incorrect current password';
                    return res.status(400).json(errors);
                }
            })
        }
    })
}

module.exports = editProfileData