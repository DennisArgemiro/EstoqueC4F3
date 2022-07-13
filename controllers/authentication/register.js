const Express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../../models/Users");
const dbInterface = require("../../models/implements/databaseInterface");

const router = Express.Router();

router.get("/register", (req, res) => {
  res.render("./authentication/register", {
    msg: false,
    msgType: "",
    msgContent: "",
  });
});

router.post("/register", async (req, res) => {
  const { username, name, email, password, retypePassword } = req.body;

  if (password === retypePassword) {
    const userData = await dbInterface.findOne(Users, { username });
    if (userData == undefined) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await dbInterface.set(Users, { username, name, email, password: hash });
      res.render("./authentication/login", {
        msg: true,
        msgType: "susses",
        msgContent: "Usuários Cadastrado com Sucesso!",
      });
    } else {
      res.render("./authentication/register", {
        msg: true,
        msgType: "error",
        msgContent: "Usuário já existe!",
      });
    }
  } else {
    res.render("./authentication/register", {
      msg: true,
      msgType: "error",
      msgContent: "Senhas não conferem!",
    });
  }
});

module.exports = router;
