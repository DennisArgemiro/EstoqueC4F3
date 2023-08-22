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

    const products = await dbInterface.get(Produtos, query, {value: "id", filter: "ASC"})
    const configuration = await dbInterface.findOne(System,{id: 1})
        if(configuration == undefined){
            await dbInterface.set(System, {
                id: 1,
                name: "EstoqueC4F3",
                owner: "EstoqueC4F3",
                cnpj: "12.345.678/1234-56",
                logo: '/images/user.png',
                cel: "1234567890",
                celTwo: "1234567890"
            })
        }

    res.render("./system/home", { products, session, configuration });

});



module.exports = router;
