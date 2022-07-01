const Logs = require("../Logs");
const { Op } = require("sequelize");
const Express = require("express");

const router = Express.Router();

/////////// funcoes da api///////////////////////
module.exports = {
  findAndCount:async (database, object, order)=>{
    const {value, filter= "ASC"} = order;

    let response  = database.findAndCountAll({order:[[value, filter]]});
    return response;
  },
  findOneLog: async (database, object) => {
    let response = await database.findOne({ where: object });

    return response;
  },
  getLog: async (database, query = {}, order) => {
    const { value, filter = "ASC" } = order;
    const { type } = query;

    let response = await database.findAll({
      order: [[value, filter]],
      where: {
        [Op.and]: [
          { ...query },
          {
            [Op.or]: [
              { id: "" },
            ],
          },
        ],
      }
    });
    return response
  },
  set: async (database, object) => {
    let response = await database.create(object);

    console.log(response);

    return response;
  },
  update: async (database, object) => {
    const { id, values } = object;

    let response = await database.update(values, { where: { id: id } });

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
