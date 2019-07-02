const Sequelize = require('sequelize');
const sequelize=require('../dbConfig');

const Text = sequelize.define('texts', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    fileName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    fileUrl: {
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

    translationSpeed: {
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

    currentTranslator: {
        type: Sequelize.STRING,
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    }


});

module.exports = Text;