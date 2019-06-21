const Sequelize = require('sequelize');
const sequelize=require('../dbConfig');

const Customer = sequelize.define('customers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    texts: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    creditCard:{
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

module.exports = Customer;