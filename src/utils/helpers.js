const axios = require('axios');
let cityCache = {}; // In production we can use redis

const geocodeCity = async (cityName) => {
  const cached = cityCache[cityName.toLowerCase()];
  if (cached) return cached;

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`; // can come from env
  const response = await require('axios').get(url);

  if (!response.data.results || !response.data.results.length) {
    throw new Error(`City "${cityName}" not found`);
  }

  const result = response.data.results[0];
  const location = {
    name: result.name,
    lat: result.latitude,
    lng: result.longitude,
  };

  cityCache[cityName.toLowerCase()] = location;
  return location;
};

const parseWeatherData = (raw, city) => {
  return {
    temp: raw.temperature_2m,
    windSpeed: raw.wind_speed_10m,
    windDir: raw.wind_direction_10m,
    weatherCode: raw.weather_code,
    fetchedAt: new Date(),
    city,
  };
};

const fetchWeather = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m`; // can come from env
  const response = await axios.get(url);
  return response.data?.current;
};

module.exports = {
  geocodeCity,
  fetchWeather,
  parseWeatherData,
};
