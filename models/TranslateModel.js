const Sequelize = require('sequelize');
const sequelize = require('../dbConfig');

const Translate = sequelize.define('texts', {

    initialTextName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },

    initialfileName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    initialTextFileUrl: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },

    originalLanguage: {
        type: Sequelize.STRING,
        allowNull: false
    },

    translationLanguage: {
        type: Sequelize.STRING,
        allowNull: false
    },

    extraReview: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },

    progress: {
        type: Sequelize.STRING,
        allowNull: false
    },

    collectionName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    translatorName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    translatorEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },

    translatedfileName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    translatedTextFileUrl: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },

    finalCost: {
        type: Sequelize.NUMBER,
        allowNull: false
    },

    isReady: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Translate;