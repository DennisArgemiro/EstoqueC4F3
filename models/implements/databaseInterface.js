const Products = require("../Products");
const { Op } = require("sequelize");
const Express = require("express");

const router = Express.Router();

/////////// funcoes da api///////////////////////
module.exports = {
  findAndCount: async (database, query = {}, order, count = {}) => {
    const { value = "id", filter = "ASC" } = order;
    const { offset = 0, limit } = count;
    const {name, ...data} = query

    let response = database.findAndCountAll({
      where: {
        [Op.or]: [{...data}, { name: { [Op.startsWith]: name || "" } }],
      },
      order: [[value, filter]],
      offset,
      limit,
    });
    return response;
  },
  findOne: async (database, object) => {
    let response = await database.findOne({ where: object });

    return response;
  },
  get: async (database, query = {}, order, exclude = []) => {
    const { value, filter = "ASC" } = order;
    const { name, ...data } = query;

    let response = await database.findAll({
      attributes: { exclude },
      order: [[value, filter]],
      where: {
        [Op.or]: [{ ...data }, { name: { [Op.startsWith]: name || "" } }],
      },
    });
    return response;
  },
  set: async (database, object) => {
    let response = await database.create(object, { logging: false });

    return response;
  },
  update: async (database, object, order) => {
    let response = await database.update(object, { where: order });

    return response;
  },
  deleteOne: async (database, filter) => {
    const { id } = filter;

    let response = await database.destroy({ where: { id } });

    return response;
  },
  deleteAll: async (database) => {
    let response = await database.destroy({ truncate: true });
    return (response = "sucess");
  },
};
/////////////////////////////////////////////////////////////////////
