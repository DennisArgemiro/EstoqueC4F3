const Express = require("express");
const System = require("../../models/System");
const router = Express.Router();
const Products = require("../../models/Products");
const Cart = require("../../models/Cart");
const Logs = require('../../models/Logs');

const isAuthenticated = require("../../middlewares/isAuthenticated");

router.get("/cart", isAuthenticated, (req, res) => {
  const session = req.session.user;

  System.findOne({ where: { id: 1 } })
    .then((configuration) => {
      Products.findAll()
        .then((products) => {
          Cart.findAndCountAll()
            .then((cartItems) => {
              res.render("./system/cart", {
                session,
                configuration,
                products,
                cartItems,
              });
            })
            .catch((error) => {
              console.log(error);
              res.redirect("/");
            });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/cart/:id", isAuthenticated, (req, res) => {
  const qtd = Number(req.body.qtd);
  const productId = req.params.id;

  System.findOne({ where: { id: 1 } })
    .then((configuration) => {
      Products.findAll()
        .then((products) => {
          Cart.findAndCountAll()
            .then((cartItems) => {
              Products.findOne({ where: { id: productId } })
                .then((productData) => {
                  if (productData != undefined) {
                    if (productData.qtd >= qtd) {
                      // temos estoque
                      Cart.findOne({ where: { product: productData.id } })
                        .then((existInCart) => {
                          if (existInCart != undefined) {
                            // atualizar
                              Cart.update({ qtd: Number(existInCart.qtd) + qtd }, { where: { id: existInCart.id } })
                              .then(() => {

                                res.redirect('/cart');

                              })
                              .catch((error) => {
                                console.log(error);
                                res.redirect("http://google.com");
                              });
                          } else {
                            // criar
                            Cart.create({ product: productData.id, qtd })
                              .then(() => {

                                res.redirect('/cart');

                              })
                              .catch((error) => {
                                console.log(error);
                                res.redirect("http://yahoo.com");
                              });
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          res.redirect("http://bing.com");
                        });
                    } else {
                      // estoque insuficiente
                      res.redirect("/cart");
                    }
                  } else {
                    // produto não existe
                    res.redirect("/cart");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  res.redirect("http://google.com");
                });

              // res.render("./system/cart", { session, configuration, products, cartItems });
            })
            .catch((error) => {
              console.log(error);
              res.redirect("/");
            });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove/:id", isAuthenticated, (req, res) => {
  Cart.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/cart");
    });
});

router.post('/checkout', isAuthenticated, (req, res) => {
  const { cpf, payment, complement, totalInput } = req.body;
  const products = { list: [] };

  if (totalInput != '0') {

    if (payment == 'Dinheiro') {

      Cart.findAll().then((cartItems) => {

        if (cartItems != undefined) {
          
    
          cartItems.forEach((cartItem) => {
            
            products.list.push({ productId: cartItem.product, qtd: cartItem.qtd });
            
            Products.findOne({ where: { id: cartItem.product } }).then((productData) => {

              Products.update({ qtd: productData.qtd - cartItem.qtd }, { where: { id: productData.id } }).then(() => {

                console.log('ok');

              }).catch((error) => {
                console.log(error);
              });

            }).catch((error) => {
              console.log(error);
            });

    
          });
    
    
          Logs.create({ cpf, payment, complement: complement[0], products, total: totalInput }).then((cartLog) => {
    
            Cart.destroy({ where: {}, truncate: true }).then(() => {
    
              res.redirect(`/view-log/${cartLog.id}`);
    
            }).catch((error) => {
              console.log(error);
              res.redirect('/cart');
              console.log(1)
            });
    
          }).catch((error) => {
            console.log(error);
            res.redirect('/cart');
            console.log(2)
          });
    
        } else {
          res.redirect('/cart');
          console.log()
        }
    
      }).catch((error) => {
        console.log(error);
        res.redirect('/cart');
        console.log(3)
      });

    } else {

      Cart.findAll().then((cartItems) => {

        if (cartItems != undefined) {
          
    
          cartItems.forEach((cartItem) => {
            
            products.list.push({ productId: cartItem.product, qtd: cartItem.qtd });

            Products.findOne({ where: { id: cartItem.product } }).then((productData) => {

              Products.update({ qtd: productData.qtd - cartItem.qtd }, { where: { id: productData.id }}).then(() => {

                console.log('ok');

              }).catch((error) => {
                console.log(error);
              });

            }).catch((error) => {
              console.log(error);
            });
    
          });
    
    
          Logs.create({ cpf, payment, complement: complement[0], products, total: totalInput }).then((cartLog) => {
    
            Cart.destroy({ where: {}, truncate: true }).then(() => {
    
              res.redirect(`/view-log/${cartLog.id}`);
    
            }).catch((error) => {
              console.log(error);
              res.redirect('/cart');
            });
    
          }).catch((error) => {
            console.log(error);
            res.redirect('/cart');
          });
    
        } else {
          res.redirect('/cart');
        }
    
      }).catch((error) => {
        console.log(error);
        res.redirect('/cart');
      });

    }

  }

});

module.exports = router;
