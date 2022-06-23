const Express = require('express');
const Products = require('../../models/Products');
const System = require('../../models/System')

const isAuthenticated = require('../../middlewares/isAuthenticated');

const router = Express.Router();

// get(rota, callback)
router.get("/novo-produto",isAuthenticated, (req, res) => {
    System.findOne({ where: { id: 1 } }).then((configuration)=>{
        const session = req.session.user;
        res.render('./system/newProduct', {session, configuration});
        
    }).catch((err)=>{
        console.log(err);
        res.redirect('/')
    })
});    


router.post('/novo-produto', (req, res) => {
    const { name, type, price, validity, lote, qtd } = req.body;

    Products.findOne({ where: { name }, order: [['id', 'DESC']] }).then((productData) => {

        if (productData == undefined) {
            // cadastra
            Products.create({ name, type, price, expirationIn: validity, lote, qtd }).then(() => {

                res.redirect('/');

            }).catch((error) => {
                console.log(error);
                res.redirect('/');
            });

        } else {

            res.send('Produto já existe!');

        }

    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});



module.exports = router;
