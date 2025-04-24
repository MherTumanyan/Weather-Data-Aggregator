require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const AppDataSource = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const cityRoutes = require('./routes/cityRoutes');
const { startWeatherJob } = require('./jobs/fetchWeather');

const app = express();
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/cities', cityRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('DB connected');
    startWeatherJob();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });
