const Express = require('express');
const Produtos = require('../../models/Products');

const isAUthenticated = require('../../middlewares/isAuthenticated');

const router = Express.Router();

// get(rota, callback)
router.get("/", isAUthenticated, (req, res) => {
    const session = req.session.user;

    Produtos.findAll().then((products) => {

        res.render("./system/home", { products, session });

    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});



module.exports = router;
