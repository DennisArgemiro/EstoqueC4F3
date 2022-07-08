const Express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Products = require("../../models/Products");
const dbInterface = require("../../models/implements/databaseInterface");
const router = Express.Router();

router.get("/filter/:type/:text", isAuthenticated, async (req, res) => {
  const { type, text } = req.params;
  const search = Number(text) == 0 ? "" : text;
  const entrie = new Map([[type,search]])
  const query = Object.fromEntries(entrie)
  console.log(query);

  try {
    const products = await dbInterface.get(Products, query, {value: type, filter:"ASC"});
    return res.render("./system/partials/tabela", { products });

  } catch (error) {
    console.log(error);
  }
});

router.get("/filterTwo/:type/:text", isAuthenticated, async(req, res) => {
  const { type, text } = req.params;
  const search = Number(text) == 0 ? "" : text;
  const entrie = new Map([[type,search]])
  const query = Object.fromEntries(entrie)
  console.log(query,"a")
try {
  
  const productsTwo = await dbInterface.get(Products, query, {value:type, filter: "ASC"})
  res.render("./system/partials/tabelaCarrinho", { productsTwo });

} catch (error) {
  console.log(error)  
}
});

module.exports = router;
