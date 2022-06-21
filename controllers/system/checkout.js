const Express = require("express");
const System = require("../../models/System");
const router = Express.Router();
const Products = require("../../models/Products");
const Cart = require("../../models/Cart");

const isAuthenticated = require('../../middlewares/isAuthenticated');

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
              console.log(cartItems);
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
  const session = req.session.user;
  const qtd = req.body.qtd;
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

                      Cart.create({ product: productData.id, qtd }).then(() => {

                        res.redirect('/cart');

                      }).catch((error) => {
                        console.log(error);
                        res.redirect('/cart');
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

module.exports = router;
