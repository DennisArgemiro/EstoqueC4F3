const Express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../../models/Users');

const router = Express.Router();

router.get("/register", (req, res) => {

  res.render("./authentication/register", { msg: false, msgType: '', msgContent: '' });
  
});

router.post('/register', (req, res) => {
  const { username, name, email, password, retypePassword } = req.body;

  if (password === retypePassword) {

    Users.findOne({ where: { username } }).then((userData) => {

      if (userData == undefined) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        Users.create({ username, name, email, password: hash }).then(() => {

          res.render("./authentication/login");

        }).catch((error) => {
          console.log(error);
          res.redirect('/');
        });


      } else {

        res.render("./authentication/register", { msg: true, msgType: 'error', msgContent: 'Usuário já existe!' });

      }

    }).catch((error) => {
      console.log(error);
      res.redirect('/');
    });

  } else {

    res.render("./authentication/register", { msg: true, msgType: 'error', msgContent: 'Senhas não conferem!' });

  }

});



module.exports = router;