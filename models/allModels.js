const Cart = require('./Cart');
const Logs = require('./Logs');
const Products = require('./Products');
const System = require('./System');
const Users = require('./Users');

System.sync({ force: true });
Users.sync({ force: true });
Products.sync({ force: true });
Cart.sync({ force: true });
Logs.sync({ force: true });
