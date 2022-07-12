const Express = require("express");
const router = Express.Router();

const System = require("../../models/System");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const Logs = require('../../models/Logs');
const Products = require('../../models/Products');

const dbInterface = require('../../models/implements/databaseInterface')
const logInterface = require('../../models/implements/logsDatabase')

router.get('/logs', isAuthenticated, async (req, res) => {
  const session = req.session.user;
  const configuration = await dbInterface.findOne(System, {id: 1})
  const logs  = await logInterface.findAndCount(Logs, {value: "id", filter: "DESC"})

  res.render('./system/logs', { session, configuration, logs });
});

router.get('/view-log/:id', isAuthenticated, async(req, res) => {
  const session = req.session.user;
  const id = Number(req.params.id);
  console.log(id)
  const query = undefined

  const configuration = await dbInterface.findOne(System, {id:1})
  const products = await dbInterface.get(Products, query, {value: "id"})
  const log = await logInterface.findOneLog(Logs, {id})

  if(log != undefined){
    res.render('./system/viewLog', { session, configuration, log, products });

  }else{
    res.redirect('/');
  }
});

module.exports = router;

