const Express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../../models/Users');

const router = Express.Router();

router.get("/login", (req, res) => {

  res.render("./authentication/login", { msg: false, msgType: '', msgContent: '' });
  
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ where: { username } }).then((userData) => {

    if (userData != undefined) {
      const isValid = bcrypt.compareSync(password, userData.password);

      if (isValid) {

        req.session.user = { id: userData.id, name: userData.name }
        res.redirect('/');

      } else {

        res.render("./authentication/login", { msg: true, msgType: 'error', msgContent: 'Esta senha no confere, meu chapa!' });

      }

    } else {

      res.render("./authentication/login", { msg: true, msgType: 'error', msgContent: 'Este nome de usuário no existe, meu chapa!' });

    }

  }).catch((error) => {
    console.log(error);
    res.redirect('/');
  });

});

router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/login');
});



module.exports = router;