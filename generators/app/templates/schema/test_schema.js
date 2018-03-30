const joi = require('joi');

module.exports = {
  postInsert: {
    userXuming: joi.number().integer().required(),
    userMobile: joi.number().integer().required(),
  }
}