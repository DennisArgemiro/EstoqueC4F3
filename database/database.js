const Sequelize = require('sequelize');

const connection = new Sequelize('estoque', 'root', 'senha123', {

    host: 'localhost',
    dialect: 'mysql',
    timezone: '-00:03'

});

module.exports = connection;


