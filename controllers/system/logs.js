const Express = require("express");
const router = Express.Router();

const System = require("../../models/System");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const Logs = require('../../models/Logs');
const Products = require('../../models/Products');

router.get('/logs', isAuthenticated, (req, res) => {
  const session = req.session.user;

  System.findOne({ where: { id: 1 } }).then((configuration) => {

      Logs.findAndCountAll({ order: [['id', 'DESC']] }).then((logs) => {

        res.render('./system/logs', { session, configuration, logs });

      }).catch((error) => {
      console.log(error);
      res.redirect('/');
    });

  }).catch((error) => {
    console.log(error);
    res.redirect('/');
  });

});

router.get('/view-log/:id', isAuthenticated, (req, res) => {
  const session = req.session.user;
  const id = Number(req.params.id);

  System.findOne({ where: { id: 1 } }).then((configuration) => {

    Products.findAll().then((products) => {

      Logs.findOne({ where: { id } }).then((log) => {

        if (log != undefined) {

          res.render('./system/viewLog', { session, configuration, log, products });

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

}).catch((error) => {
  console.log(error);
  res.redirect('/');
});



});

module.exports = router;

