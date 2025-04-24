const weatherService = require('../services/weatherService');

const getRawDataHandler = async (req, res) => {
  const { city, from, to } = req.query;
  if (!city || !from || !to) {
    return res.status(400).json({ error: 'city, from, and to are required' });
  }

  try {
    const weathers = await weatherService.getWeatherForCity(city, new Date(from), new Date(to));
    res.json(weathers);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch data', details: err.message });
  }
};

const getAverageDataHandler = async (req, res) => {
  const { city, from, to } = req.query;
  if (!city || !from || !to) {
    return res.status(400).json({ error: 'city, from, and to are required' });
  }

  try {
    const averages = await weatherService.getAverageWeatherForCity(
      city,
      new Date(from),
      new Date(to)
    );
    if (!averages || !averages.avgtemp) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json({
      city,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
      averageTemperature: parseFloat(averages.avgtemp),
      averageWindspeed: parseFloat(averages.avgwindspeed),
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch average data', details: err.message });
  }
};

module.exports = {
  getRawDataHandler,
  getAverageDataHandler,
};
