const AppDataSource = require('../config/db');

const addCity = async ({ name, lat, lng }) => {
  const repo = AppDataSource.getRepository('City');
  const city = repo.create({ name: name.toLowerCase(), lat, lng });
  return await repo.save(city);
};

const getCityByName = async (name) => {
  const repo = AppDataSource.getRepository('City');
  return await repo.findOneBy({ name: name.toLowerCase() });
};

const getAllCities = async () => {
  const repo = AppDataSource.getRepository('City');
  return await repo.find();
};

module.exports = {
  addCity,
  getCityByName,
  getAllCities,
};
