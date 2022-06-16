const Express = require('express');
const Produtos = require('../../models/Products');

const router = Express.Router();

// get(rota, callback)
router.get("/", (req, res) => {

    Produtos.findAll().then((products) => {

        res.render("./system/home", { products });

    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});



module.exports = router;
