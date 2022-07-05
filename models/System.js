const Sequelize = require('sequelize');
const connection = require('../database/database');

const System = connection.define('system', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    cel: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    celTwo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
   
});


module.exports = System;

