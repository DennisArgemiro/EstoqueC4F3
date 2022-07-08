const Express = require("express");
const session = require('express-session');

const connection = require('./database/database');

const homeController = require("./controllers/system/home");
const productsController = require("./controllers/system/products");
const loginController = require("./controllers/authentication/login");
const registerController = require("./controllers/authentication/register");
const filterController = require("./controllers/system/filter");
const checkoutController = require("./controllers/system/checkout");
const logsController = require("./controllers/system/logs");
const configurationController = require("./controllers/dashboard/configuration");

const MercadoPago = require('mercadopago');

MercadoPago.configure({
  sandbox: true,
  access_token: 'TEST-3946894957343841-062300-bd7dd6784bb795afabe051cdebfa845b-263382960'
});

const app = Express();

app.use(session({
  secret: 'XHDE-ASDF-JKSX-SDCV-ASEE-WDSSA-ASDFE',
  cookie: { maxAge: (((1000 * 60) * 60) * 24) },
  resave: true,
  saveUninitialized: true
}));

app.set("view engine", "ejs");
app.use(Express.static("public"));
app.use(Express.json({ limit: "50mb" }));

app.use(Express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/", homeController);
app.use("/", productsController);
app.use("/", loginController);
app.use("/", registerController);
app.use("/", filterController);
app.use("/", checkoutController);
app.use("/", configurationController);
app.use("/", logsController);

connection.authenticate().then(() => {
  
  console.log('Conectei com Banco de Dados!');

  app.listen(8080, (error) => {

    if (!error) {

      console.log('ok');

    } else {
      console.log(error);
    }

  })


}).catch((error) => {

  console.log(error);

});
