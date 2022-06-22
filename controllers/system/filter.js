const Express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Products = require("../../models/Products");

const router = Express.Router();


router.get("/filter/:type/:text", isAuthenticated, (req, res) => {
  const { type, text } = req.params;

  if (Number(text) === 0) {
    switch (type) {
      case "name":
        Products.findAll({ order: [["name", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "type":
        Products.findAll({ order: [["type", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "price":
        Products.findAll({ order: [["price", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "validity":
        Products.findAll({ order: [["expirationIn", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "lote":
        Products.findAll({ order: [["lote", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "qtd":
        Products.findAll({ order: [["qtd", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      default:
        Products.findAll({ order: [["name", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;
    }
  } else {
    switch (type) {
      case "name":
        Products.findAll({ where: { name: text }, order: [["name", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "type":
        Products.findAll({ where: { type: text }, order: [["type", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "price":
        Products.findAll({ where: { price: text }, order: [["price", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "validity":
        Products.findAll({
          where: { expirationIn: text },
          order: [["expirationIn", "ASC"]],
        })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "lote":
        Products.findAll({ where: { lote: text }, order: [["lote", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "qtd":
        Products.findAll({ where: { qtd: text }, order: [["qtd", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      default:
        Products.findAll({ order: [["name", "ASC"]] })
          .then((products) => {
            res.render("./system/partials/tabela", { products });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;
    }
  }
});

router.get("/filterTwo/:type/:text", isAuthenticated, (req, res) => {
  const { type, text } = req.params;

  if (Number(text) === 0) {
    switch (type) {
      case "name":
        Products.findAll({ order: [["name", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "type":
        Products.findAll({ order: [["type", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "price":
        Products.findAll({ order: [["price", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "validity":
        Products.findAll({ order: [["expirationIn", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "lote":
        Products.findAll({ order: [["lote", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "qtd":
        Products.findAll({ order: [["qtd", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      default:
        Products.findAll({ order: [["name", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;
    }
  } else {
    switch (type) {
      case "name":
        Products.findAll({ where: { name: text }, order: [["name", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "type":
        Products.findAll({ where: { type: text }, order: [["type", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "price":
        Products.findAll({ where: { price: text }, order: [["price", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "validity":
        Products.findAll({
          where: { expirationIn: text },
          order: [["expirationIn", "ASC"]], limit: 5,
        })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "lote":
        Products.findAll({ where: { lote: text }, order: [["lote", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      case "qtd":
        Products.findAll({ where: { qtd: text }, order: [["qtd", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;

      default:
        Products.findAll({ order: [["name", "ASC"]], limit: 5 })
          .then((productsTwo) => {
            res.render("./system/partials/tabelaCarrinho", { productsTwo });
             
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/");
          });
        break;
    }
  }
});

module.exports = router;
