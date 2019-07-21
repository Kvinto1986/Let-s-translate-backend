const express = require('express');
const bcrypt = require('bcryptjs');

const validateProfileEdit = require('../../../validation/users/validateProfileEdit')
const Customer = require('../../../models/CustomerModel');
const User = require('../../../models/UserModel');
const Text = require('../../../models/TextModel');
const Translate = require('../../../models/TranslateModel')
const Message = require('../../../models/MessageModel')


const editProfileData = (req, res, next) => {
    const {data, user} = req.body

    const {errors, isValid} = validateProfileEdit(data);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        nameOld,emailOld,name, email, phone, creditCard, password, passwordCur
    } = data
    const dataForNewObject = [{name}, {email}, {phone}, {creditCard}, {password}]
    let userModel

    if (user.role === 'admin' || user.role === 'translator') {
        userModel = User

        if(email!==''||name!=='') {
            Translate.findAll({where: {translatorEmail: emailOld}}).then(
                messages => {
                    if (messages.length > 0) {
                        messages.map((elem) => {
                            if (email !== '') {
                                elem.translatorEmail = email;
                                elem.save()
                            }
                            if (name !== '') {
                                elem.translatorName = name;
                                elem.save()
                            }
                            return elem
                        })
                    }
                })
        }

    }
    else if (user.role === 'customer') {
        userModel = Customer;

        if(email!==''||name!=='') {
            Text.findAll({where: {email: emailOld}}).then(
                messages => {
                    if (messages.length > 0) {
                        messages.map((elem) => {
                            if (email !== '') {
                                elem.email = email;
                                elem.save()
                            }
                            if (name !== '') {
                                elem.name = name
                                elem.save()
                            }
                            return elem
                        })
                    }
                })

            Translate.findAll({where: {customerEmail: emailOld}}).then(
            messages => {
                if (messages.length > 0) {
                    messages.map((elem) => {
                        if (email !== '') {
                            elem.customerEmail = email;
                            elem.save()
                        }
                        if (name !== '') {
                            elem.customerName = name
                            elem.save()
                        }
                        return elem
                    })
                }
            })
    }

        }

    console.log(req.body)
    if(email!==''||name!=='') {
        Message.findAll({where: {senderEmail: emailOld}}).then(
            messages => {
                if (messages.length > 0) {
                    messages.map((elem) => {
                        if (email !== '') {
                            elem.senderEmail = email
                            elem.save()
                        }
                        if (name !== '') {
                            elem.senderName = name
                            elem.save()
                        }
                        return elem
                    })
                }
            }
        ).then(() => {
            Message.findAll({where: {recipientEmail: emailOld}}).then(
                messages => {
                    if (messages.length > 0) {
                        messages.map((elem) => {
                            if (email !== '') {
                                elem.recipientEmail = email
                                elem.save()
                            }
                            if (name !== '') {
                                elem.recipientName = name
                                elem.save()
                            }
                            return elem
                        })
                    }
                }
            )
        })
    }


    userModel.findOne({where: {id: user.id}})
        .then(user => {
            if (user) {
                if (user.email === data.email) {
                    errors.email = 'User with this email already exists';
                    return res.status(400).json(errors);
                }

                bcrypt.compare(data.passwordCur, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const validData = dataForNewObject.filter(unit => Object.values(unit)[0])
                            let editedData = Object.assign({}, ...validData)

                            if (Object.values(editedData).length === 0) {
                                errors.common = 'Please, fill at list one input';
                                return res.status(400).json(errors);
                            }

                            if (editedData.password) {
                                bcrypt.genSalt(10, (err, salt) => {
                                    if (err) console.error('There was an error', err);
                                    else {
                                        bcrypt.hash(password, salt, (err, hash) => {
                                            if (err) console.error('There was an error', err);
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