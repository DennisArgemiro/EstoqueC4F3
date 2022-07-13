const Express = require("express");
const System = require("../../models/System");
const Users = require("../../models/Users");
const dbInterface = require("../../models/implements/databaseInterface");

const isAuthenticated = require("../../middlewares/isAuthenticated");
const session = require("express-session");

const router = Express.Router();

// get(rota, callback)
router.get("/dashboard/configuration", isAuthenticated, async (req, res) => {
  const session = req.session.user;

  const configuration = await dbInterface.findOne(System, { id: 1 });
  const userData = await dbInterface.findOne(Users, { id: session.id });

  userData != undefined && userData.isAdministrator
    ? res.render("./dashboard/configuration",{
        session,
        configuration,
      })
    : res.redirect("/");

  //   System.findOne({ where: { id: 1 } })
  //     .then((configuration) => {
  //       Users.findOne({ where: { id: session.id } })
  //         .then((userData) => {
  //           if (userData != undefined) {
  //             if (userData.isAdministrator) {
  //               res.render("./dashboard/configuration", {
  //                 session,
  //                 configuration,
  //               });
  //             } else {
  //               res.redirect("/");
  //             }
  //           } else {
  //             res.redirect("/");
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           res.redirect("/");
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.redirect("/");
  //     });
});

router.post(
  "/dashboard/configuration/save",
  isAuthenticated,
  async (req, res) => {
    const session = req.session.user;
    const { name, owner, cnpj, logo, adress, cel, celTwo } = req.body;

    const userData = await dbInterface.findOne(Users, { id: session.id });

    if (userData != undefined && userData.isAdministrator) {
      dbInterface.update(
        System,
        { name, owner, cnpj, logo, adress, cel, celTwo },
        { id: 1 }
      );
      console.log("Tentei")
      res.redirect("/")
    } else {
      res.send("Deu ruim!");
    }
  }
);

module.exports = router;
