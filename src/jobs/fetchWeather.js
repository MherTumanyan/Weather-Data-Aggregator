const cron = require('node-cron');
const cityService = require('../services/cityService');
const weatherService = require('../services/weatherService');
const pLimit = require('p-limit');

const limit = pLimit(5); // Limiting requests count

const startWeatherJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    // schedule can be an env variable
    const cities = await cityService.getAllCities();
    
    const promises = cities.map(city => limit(() => weatherService.fetchAndStoreWeatherForCity(city)));
    await Promise.all(promises);

    console.log('Weather updated for all cities');
  });
};

module.exports = { startWeatherJob };
