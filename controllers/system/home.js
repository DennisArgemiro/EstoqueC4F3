const Express = require('express');
const Produtos = require('../../models/Products');
const System = require('../../models/System');
const dbInterface = require("../../models/implements/databaseInterface")

const isAUthenticated = require('../../middlewares/isAuthenticated');

const router = Express.Router();

// get(rota, callback)
router.get("/", isAUthenticated, async(req, res) => {
    const session = req.session.user;
    const query = undefined

    const configuration = await dbInterface.findOne(System,{id: 1})
    const products = await dbInterface.get(Produtos, query, {value: "id", filter: "ASC"})

    res.render("./system/home", { products, session, configuration });

});



module.exports = router;
