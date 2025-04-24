const cityService = require('../services/cityService');
const { geocodeCity } = require('../utils/helpers');

const addCityHandler = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const existing = await cityService.getCityByName(name);
    if (existing) return res.status(409).json({ message: 'City already exists', city: existing });

    const location = await geocodeCity(name);
    const city = await cityService.addCity(location);
    res.status(201).json(city);
  } catch (err) {
    res.status(500).json({ error: 'Could not add city', error: err.message });
  }
};

const getAllCitiesHandler = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Could not get cities', error: err.message });
  }
};

module.exports = { getAllCitiesHandler, addCityHandler };
