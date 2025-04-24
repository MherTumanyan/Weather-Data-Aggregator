const Joi = require('joi');

const weatherQuerySchema = Joi.object({
  city: Joi.string().min(2).max(100).required(),
  from: Joi.date().iso().required(),
  to: Joi.date().iso().required(),
});

module.exports = {
  weatherQuerySchema,
};
