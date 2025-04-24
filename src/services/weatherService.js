const AppDataSource = require('../config/db');
const { fetchWeather, parseWeatherData } = require('../utils/helpers');

const getWeatherForCity = async (cityName, from, to) => {
  const repo = AppDataSource.getRepository('Weather');
  return await repo
    .createQueryBuilder('weather')
    .leftJoinAndSelect('weather.city', 'city')
    .where('city.name = :cityName', { cityName: cityName.toLowerCase() })
    .andWhere('weather.fetched_at BETWEEN :from AND :to', {
      from: from.toISOString(),
      to: to.toISOString(),
    })
    .getMany();
};

const getAverageWeatherForCity = async (cityName, from, to) => {
  const repo = AppDataSource.getRepository('Weather');
  return await repo
    .createQueryBuilder('weather')
    .select('AVG(weather.temp)', 'avgtemp')
    .addSelect('AVG(weather.windSpeed)', 'avgwindspeed')
    .leftJoin('weather.city', 'city')
    .where('city.name = :cityName', { cityName: cityName.toLowerCase() })
    .andWhere('weather.fetched_at BETWEEN :from AND :to', {
      from: from.toISOString(),
      to: to.toISOString(),
    })
    .getRawOne();
};

const saveWeather = async (weatherData) => {
  const repo = AppDataSource.getRepository('Weather');
  const weather = repo.create(weatherData);
  return await repo.save(weather);
};

const fetchAndStoreWeatherForCity = async (city) => {
  const rawData = await fetchWeather(city.lat, city.lng);
  const parsedData = parseWeatherData(rawData, city);
  return await saveWeather(parsedData);
};

module.exports = {
  saveWeather,
  getWeatherForCity,
  getAverageWeatherForCity,
  fetchAndStoreWeatherForCity,
};
