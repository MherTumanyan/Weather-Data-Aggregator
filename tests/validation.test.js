const request = require('supertest');
const express = require('express');
const validate = require('../src/middleware/validate');
const { addCitySchema } = require('../src/validations/cityValidation');
const { weatherQuerySchema } = require('../src/validations/weatherValidation');

const app = express();
app.use(express.json());

app.post('/test/city', validate(addCitySchema), (req, res) => {
  res.status(200).json({ message: 'City validated' });
});

app.get('/test/weather', validate(weatherQuerySchema), (req, res) => {
  res.status(200).json({ message: 'Weather validated' });
});

describe('Validation Middleware', () => {
  describe('POST /test/city', () => {
    it('should pass validation with valid body', async () => {
      const response = await request(app).post('/test/city').send({
        name: 'Yerevan',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('City validated');
    });

    it('should fail if name is too short', async () => {
      const response = await request(app).post('/test/city').send({
        name: 'Y',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should fail if name is missing', async () => {
      const response = await request(app).post('/test/city').send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /test/weather', () => {
    it('should fail if "to" date is in the future', async () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const response = await request(app).get('/test/weather').query({
        city: 'Yerevan',
        from: '2024-04-20',
        to: futureDate,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should fail if city name is missing', async () => {
      const response = await request(app).get('/test/weather').query({
        from: '2024-04-20',
        to: '2024-04-22',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});
