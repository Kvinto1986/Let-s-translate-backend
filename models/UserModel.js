const Sequelize = require('sequelize');
const sequelize=require('../dbConfig');

const User = sequelize.define('users', {

    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orders: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verify:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = User;