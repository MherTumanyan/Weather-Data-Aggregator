const Joi = require('joi');

const addCitySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
});

module.exports = {
  addCitySchema,
};
