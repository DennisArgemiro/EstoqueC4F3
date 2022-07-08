const Logs = require("../Logs");
const { Op } = require("sequelize");
const Express = require("express");

const router = Express.Router();

/////////// funcoes da api///////////////////////
module.exports = {
  findAndCount:async (database, order)=>{
    const {value, filter= "ASC"} = order;

    let response  = database.findAndCountAll({order:[[value, filter]]});
    return response;
  },
  findOneLog: async (database, object) => {
    let response = await database.findOne({ where: object });

    return response;
  },
  getLog: async (database, order) => {
    const { value= "id", filter = "ASC" } = order;

    let response = await database.findAll({order: [[value, filter]]});
    return response
  },
  set: async (database, object) => {
    let response = await database.create(object,{logging: false});

    console.log(response);

    return response;
  },
  update: async (database, object, filter ={}) => {

    let response = await database.update(object, { where: {filter} });

    return response;
  },
  deleteOne: async (database, filter) => {
    const { id } = filter;

    let response = await database.destroy({ where: { id } });

    return response;
  },
  deleteAll: async (database) => {
    let response = await database.destroy({ truncate: true });
    console.log(response);
    return (response = "sucess");
  },
};
/////////////////////////////////////////////////////////////////////
