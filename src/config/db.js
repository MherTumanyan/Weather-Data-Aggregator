const { DataSource } = require('typeorm');
const City = require('../models/City');
const Weather = require('../models/Weather');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [City, Weather],
});

module.exports = AppDataSource;
