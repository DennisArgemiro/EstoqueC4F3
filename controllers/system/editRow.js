const Express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router = Express.Router();
const dbInterfdace = require("../../models/implements/databaseInterface");
const Products = require("../../models/Products");

router.get("/row-edit", (req, res) => {
  res.send("Olá");
});

router.post("/row-edit/:id", isAuthenticated, async (req, res) => {
  const { select, value } = req.body;
  const query = Object.fromEntries([[select, value]])
  const id = req.params.id;

  const products = await dbInterfdace.update(Products, query, {id});
  console.log(products);

  res.redirect("/");
});

module.exports = router;
