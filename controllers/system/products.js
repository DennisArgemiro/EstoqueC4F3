const Express = require('express');
const Products = require('../../models/Products');

const router = Express.Router();

// get(rota, callback)
router.get("/novo-produto", (req, res) => {

    res.render('./system/newProduct');

});

router.post('/novo-produto', (req, res) => {

    const { name, type, price, validity, lote, qtd } = req.body;

    Products.findOne({ where: { name }, order: [['id', 'DESC']] }).then((productData) => {

        if (productData == undefined) {
            // cadastra
            Products.create({ name, type, price, expirationIn: validity, lote, qtd }).then(() => {

                res.send('Produto Cadastrado!');

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
