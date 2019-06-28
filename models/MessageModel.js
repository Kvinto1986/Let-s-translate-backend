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

    senderName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    recipientName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    messageText: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },

    senderSeen: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    recipientSeen: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

module.exports = Message;