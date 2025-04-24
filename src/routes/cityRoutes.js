const express = require('express');
const { addCityHandler, getAllCitiesHandler } = require('../controllers/cityController');
const { addCitySchema } = require('../validations/cityValidation');
const validate = require('../middleware/validate');

const router = express.Router();
router.post('/', validate(addCitySchema), addCityHandler);
router.get('/', getAllCitiesHandler);

module.exports = router;
