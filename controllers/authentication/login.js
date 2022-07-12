const Express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../../models/Users");
const databaseInterface = require("../../models/implements/databaseInterface");

const router = Express.Router();

router.get("/login", (req, res) => {
  res.render("./authentication/login", {
    msg: false,
    msgType: "",
    msgContent: "",
  });
});

router.post("/login", async(req, res) => {
  const { username, password } = req.body;

  const userData = await databaseInterface.findOne(Users, {username})
  if (userData != undefined) {
    const isValid = bcrypt.compareSync(password, userData.password);

    if (isValid) {
      req.session.user = {
        id: userData.id,
        name: userData.name,
        isAdministrator: userData.isAdministrator,
      };
      res.redirect("/");
    } else {
      res.render("./authentication/login", {
        msg: true,
        msgType: "error",
        msgContent: "As Credenciais não conferem!",
      });
    }
  } else {
    res.render("./authentication/login", {
      msg: true,
      msgType: "error",
      msgContent: "As Credenciais não conferem!",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
});

module.exports = router;
