///////////////////////
  // const qtd = Number(req.body.qtd);
  // const productId = req.params.id;

  // var query = undefined;
  // const search = text == "0" ? "" : text;

  // if (search != "") {
  //   query = Object.fromEntries([[type, search]]);
  // }

  // const configuration = await findOne(System, { id: 1 });
  // const products = await get(Products, query, { value: type, filter: "ASC" });
  // const cartItems = await findAndCount(Cart, undefined, {
  //   value: "id",
  //   order: "ASC",
  // });
  // const productData = await findOne(Products, { id: productId });

  // if (productData != undefined || productData.qtd >= qtd) {
  //   const existInCart = await findOne(Cart, { product: productData.id });
  //   if (existInCart != undefined) {
  //     await update(
  //       Cart,
  //       { qtd: Number(existInCart.qtd) + qtd },
  //       { id: existInCart.id }
  //     );
  //   } else {
  //     await set(Cart, { product: productData.id, qtd });
  //   }
  //   console.log("Resposta da Interface do POST: ", productData.id);

  //   res.render("./system/cart", {
  //     session,
  //     configuration,
  //     products,
  //     cartItems,
  //   });
  // } else {
  //   redirect("/cart");
  // }
  ///////////////////////////////////////////

    // const { type, text ="" } = req.params;
  // var query = undefined;
  // const search = text == "0" ? "" : text;

  // if (search != "") {
  //   query = Object.fromEntries([[type, search]]);
  // }

  // const configuration = await findOne(System, { id: 1 });
  // const products = await get(Products, query, { value: "id", filter: "ASC" });
  // const cartItems = await cartInterface.findAndCount(Cart, query, {
  //   value: "id",
  //   filter: "ASC",
  // });

  // console.log("Resposta da Interface do Get: ", products.product);
  // res.render("./system/cart", {
  //   session,
  //   configuration,
  //   products,
  //   cartItems,
  // });
  // ////////////////////////////////////
  // const {
  //   findOne,
  //   get,
  //   set,
  //   update,
  //   deleteItem,
  //   findAndCount,
  // } = require("../../models/implements/databaseInterface");
  // const cartInterface = require("../../models/implements/cartInterface");