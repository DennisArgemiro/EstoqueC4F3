const Sequelize = require('sequelize');
const connection = require('../database/database');

const Users = connection.define('users', {

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00/00/0000'
    },
    isAdministrator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});


module.exports = Users;

