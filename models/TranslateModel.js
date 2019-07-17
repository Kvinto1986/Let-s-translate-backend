const Sequelize = require('sequelize');
const sequelize = require('../dbConfig');

const Translate = sequelize.define('translates', {

    textId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    initialTextName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    customerName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    customerEmail: {
        type: Sequelize.STRING,
        allowNull: true
    },

    initialfileName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    initialTextFileUrl: {
        type: Sequelize.STRING(1000),
        allowNull: true
    },

    originalLanguage: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translationLanguage: {
        type: Sequelize.STRING,
        allowNull: true
    },

    extraReview: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    isReviewed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },

    progress: {
        type: Sequelize.STRING,
        allowNull: true
    },

    collectionName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translatorName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translatorEmail: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translatedfileName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translatedTextFileUrl: {
        type: Sequelize.STRING(1000),
        allowNull: true
    },

    translateTextName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    translateText: {
        type: Sequelize.STRING(10000),
        allowNull: true
    },

    translationSpeed: {
        type: Sequelize.STRING,
        allowNull: true
    },

    finalCost: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    isReady: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    isPaid: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    date: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Translate;