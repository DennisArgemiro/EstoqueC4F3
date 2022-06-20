const Express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Products = require("../../models/Products");

const router = Express.Router();

router.get("/filter", isAuthenticated, (req, res) => {
  const session = req.session.user;
  res.send("foda");
});

router.post("/filter", (req, res) => {

    const { nameFilter, filter } = req.body;
    res.send(nameFilter, filter)

  switch (`${filter}`) {
    case "name":
      nameFunc(nameFilter);
      break;
    case "type":
      typeFunc(nameFilter);
      break;
    case "price":
      pricefunc(nameFilter);
      break;
    case "expirationIn":
      exprationInFunc(nameFilter);
      break;
    case "lote":
      loteFunc(nameFilter);
      break;
    case "qtd":
      qtdFunc(nameFilter);
      break;
 }

  function nameFunc(aux) {
    Products.findAll({ where: { name: `${aux}` } }).then((productData) => {
      res.send(productData);
    });
  }
  function typeFunc(aux) {
    Products.findAll({ where: { type: `${aux}` } }).then((productData) => {
      res.send(productData);
    });
  }
  function pricefunc(aux) {
    Products.findAll({ where: { price: `${aux}` } }).then((productData) => {
      res.send(productData);
    });
  }
  function exprationInFunc(aux) {
    Products.findAll({ where: { expirationIn: `${aux}` } }).then(
      (productData) => {
        res.send(productData);
      }
    );
  }
  function loteFunc() {
    Products.findAll({ where: { lote: `${nameFilter}` } }).then(
      (productData) => {
        res.send(productData);
      }
    );
  }
  function qtdFunc() {
    Products.findAll({ where: { qtd: `${nameFilter}` } }).then(
      (productData) => {
        res.send(productData);
      }
    );
  }
});

module.exports = router;
