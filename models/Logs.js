const Sequelize = require('sequelize');
const connection = require('../database/database');

const Logs = connection.define('logs', {
    cpf: {
        type: Sequelize.STRING
    },
    payment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00,00'
    },
    products: {
        type: Sequelize.JSON,
        allowNull: false
    }

});

// { "list": [{ "qtd":  "10",  "productId":  "1"}, { "qtd":  "15",  "productId":  "2"}]}

module.exports = Logs;