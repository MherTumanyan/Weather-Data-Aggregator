const express = require('express');
const { weatherQuerySchema } = require('../validations/weatherValidation');
const controller = require('../controllers/weatherController');
const validate = require('../middleware/validate');

const router = express.Router();
router.get('/raw', validate(weatherQuerySchema, 'query'), controller.getRawDataHandler);
router.get('/average', validate(weatherQuerySchema, 'query'), controller.getAverageDataHandler);

module.exports = router;
