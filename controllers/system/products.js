const Express = require("express");
const Products = require("../../models/Products");
const System = require("../../models/System");
const dbInterfdace = require("../../models/implements/databaseInterface");

const isAuthenticated = require("../../middlewares/isAuthenticated");

const router = Express.Router();

// get(rota, callback)
router.get("/novo-produto", isAuthenticated, async (req, res) => {
  const session = req.session.user;
  const configuration = await dbInterfdace.findOne(System, { id: 1 });
  res.render("./system/newProduct", { session, configuration });
});

router.post("/novo-produto", async (req, res) => {
  const { name, type, price, validity, lote, qtd } = req.body;
  console.log("Validade: ",validity);
  const productData = await dbInterfdace.findOne(System, { name });
  if (productData == undefined) {
    await dbInterfdace.set(Products, {
      name,
      type,
      price,
      expirationIn: validity,
      lote,
      qtd,
    });
    res.redirect("/novo-produto");
  } else {
    res.send("Produto já existe!");
  }
});

module.exports = router;
