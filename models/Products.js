const Sequelize = require('sequelize');
const connection = require('../database/database');

const Products = connection.define('products', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    expirationIn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00/00/0000'
    },
    lote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    qtd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

module.exports = Products;

