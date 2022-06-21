const Sequelize = require('sequelize');
const connection = require('../database/database');

const Cart = connection.define('cart', {

    product: {
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

module.exports = Cart;

