# 🌤️ Weather Monitoring System
Simple weather tracking API built with **Node.js, Express, PostgreSQL, and TypeORM**. 
It fetches real-time weather data from [Open-Meteo](https://open-meteo.com/) every 10 minutes, stores it in a database, and provides endpoints to get raw data or average readings for a specific city and date range.

## 🚀 Features

- Add cities to track (with geolocation)
- Automatically fetch weather data every 10 minutes
- Store temperature, wind speed, direction, and weather code
- Get raw weather data for a city over a date range
- Get average temperature and wind stats for a city over a date range

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- TypeORM
- Axios
- node-cron (for scheduled jobs)
- Prettier (for formatting)

##  Installation

1. Clone
   ```bash
    git clone git@github.com:MherTumanyan/Weather-Data-Aggregator.git
    cd weather-monitoring

2. Install dependencies:
    ```bash
    npm install

3. Set up .env file:
    ```bash
    PORT=
    DATABASE_URL=postgres://user:pass@localhost:5432/weatherdb

4. Start the server:
    ```bash
    npm start

5. Unit tests:
    ```bash
    npm run test


## 🧪 Manual Testing

You can test the full functionality by importing the **Postman Collection** from the project’s **file structure** into *Postman*.
