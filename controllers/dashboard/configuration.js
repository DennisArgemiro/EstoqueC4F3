const Express = require('express');
const System = require('../../models/System');
const Users = require('../../models/Users');

const isAuthenticated = require('../../middlewares/isAuthenticated');
const session = require('express-session');

const router = Express.Router();

// get(rota, callback)
router.get("/dashboard/configuration", isAuthenticated, (req, res) => {
    const session = req.session.user;

    System.findOne({ where: { id: 1 } }).then((configuration) => {
   

        Users.findOne({ where: { id: session.id } }).then((userData) => {

            if (userData != undefined) {
    
                if (userData.isAdministrator) {
    
                    res.render("./dashboard/configuration", { session, configuration });
                    
                } else {
    
                    res.redirect('/');
    
                }
    euvoumamar
            } else {
    
                res.redirect('/');
    
            }
    
        }).catch((error) => {
            console.log(error);
            res.redirect('/');
        });



    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});

router.post('/dashboard/configuration/save', isAuthenticated, (req, res) => {
    const session = req.session.user;
    const { name, owner, cnpj, logo, adress, cel, celTwo } = req.body;

    Users.findOne({ where: { id: session.id } }).then((userData) => {

        if (userData != undefined) {

            if (userData.isAdministrator) {

                System.update({ name, owner, cnpj, logo, adress, cel, celTwo }, { where: { id: 1 } }).then(() => {

                    res.redirect('/');

                }).catch((error) => {
                    console.log(error);
                    res.redirect('/');
                });

            } else {

                res.redirect('/');

            }

        } else {

            res.redirect('/');

        }

    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });

});



module.exports = router;
