const Express = require("express");
const System = require("../../models/System");
const router = Express.Router();
const Products = require("../../models/Products");
const Cart = require("../../models/Cart");
const Logs = require("../../models/Logs");
const logsDatabase = require("../../models/implements/logsDatabase");
const {
  set,
  get,
  findOne,
  findAndCount,
  deleteOne,
  deleteAll,
  update,
} = require("../../models/implements/databaseInterface");

const isAuthenticated = require("../../middlewares/isAuthenticated");

router.get("/cart", isAuthenticated, async (req, res) => {
  const session = req.session.user;

  const configuration = await findOne(System, { id: 1 });
  const query = undefined;

  const products = await get(Products, query, { value: "id", filter: "ASC" });
  const cartItems = await logsDatabase.findAndCount(Cart,{
    value: "id",
    filter: "ASC",
  });

  res.render("./system/cart", {
    session,
    configuration,
    products,
    cartItems,
  });
});
router.post("/cart/:id", isAuthenticated, async (req, res) => {
  const qtd = Number(req.body.qtd);
  const productId = req.params.id;
  const productData = await findOne(Products, { id: productId });

  if (productData != undefined && productData.qtd >= qtd) {
    const existInCart = await findOne(Cart, { product: productData.id });
    if (existInCart != undefined && qtd > 0) {
      await update(
        Cart,
        { qtd: Number(existInCart.qtd) + Number(qtd) },
        { id: existInCart.id }
        );
      } else if(existInCart != undefined && qtd == 0){
      console.log(existInCart.qtd)
      console.log(qtd)
      await update(Cart, {qtd:Number(existInCart.qtd) + 1},{ id: existInCart.id});
    } else{
      await set(Cart, { product: productData.id, qtd: 1 });
    }
    res.redirect("/cart");
  }
});

router.post("/remove/:id", isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);
  console.log("O id do Req.params é: ", id);
  await deleteOne(Cart, { id: id });
  res.redirect("/cart");
});

router.post("/checkout", isAuthenticated, async (req, res) => {
  const { cpf, payment, complement, totalInput } = req.body;
  const products = { list: [] };
  if (totalInput != "0") {
    if (payment == "Dinheiro") {
    }
    const cartItems = await logsDatabase.getLog(Cart, {
      value: "id",
      filter: "ASC",
    });
    if (cartItems != undefined) {
      cartItems.forEach(async (cartItem) => {
        products.list.push({
          productId: cartItem.product,
          qtd: cartItem.qtd,
        });
        const productData = await findOne(Products, {id: Number(cartItem.product)});
        await update(
          Products,
          { qtd: Number(productData.qtd) - cartItem.qtd },
          { id: Number(productData.id) }
        );
      });
      const cartLog = await logsDatabase.set(Logs, {
        cpf,
        payment,
        complement: complement[0],
        products,
        total: totalInput,
      });
      await logsDatabase.deleteAll(Cart);
      console.log("Este é o cartlog: ",cartLog);
      res.redirect(`/view-log/${cartLog.id}`);
    } else {
      res.redirect("/cart");
    }
  }
});


module.exports = router;
