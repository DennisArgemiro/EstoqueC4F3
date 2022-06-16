const Express = require("express");

const connection = require('./database/database');

const homeController = require("./controllers/system/home");
const productsController = require("./controllers/system/products");

const app = Express();

app.set("view engine", "ejs");
app.use(Express.static("public"));
app.use(Express.json({ limit: "50mb" }));

app.use(Express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/", homeController);
app.use("/", productsController);

connection.authenticate().then(() => {
  
  console.log('Conectei com Banco de Dados!');

  app.listen(8888, (error) => {

    if (!error) {

      console.log('ok');

    } else {
      console.log(error);
    }

  })


}).catch((error) => {

  console.log(error);

});
