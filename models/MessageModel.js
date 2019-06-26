const Sequelize = require('sequelize');
const sequelize=require('../dbConfig');

const Message = sequelize.define('messages', {

    senderEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },

    recipientEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },

    messageText: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

module.exports = Message;