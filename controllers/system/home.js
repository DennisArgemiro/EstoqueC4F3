const Express = require('express');
const Produtos = require('../../models/Products');
const System = require('../../models/System');

const isAUthenticated = require('../../middlewares/isAuthenticated');

const router = Express.Router();

// get(rota, callback)
router.get("/", isAUthenticated, (req, res) => {
    const session = req.session.user;

    System.findOne({ where: { id: 1 } }).then((configuration) => {

        Produtos.findAll().then((products) => {

            res.render("./system/home", { products, session, configuration });
    
        }).catch((error) => {
            console.log(error);
            res.redirect('/');
        });

    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});



module.exports = router;
