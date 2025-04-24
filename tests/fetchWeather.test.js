const axios = require('axios');
const { fetchWeather } = require('../src/utils/helpers');

jest.mock('axios');

describe('fetchWeather', () => {
  it('should return weather data when API responds correctly', async () => {
    const mockData = {
      data: {
        current: {
          temperature_2m: 21.5,
          weather_code: 1,
          wind_speed_10m: 5.4,
          wind_direction_10m: 180,
        },
      },
    };

    axios.get.mockResolvedValue(mockData);

    const result = await fetchWeather(40.1772, 44.5035); // This is Yerevan

    expect(result).toEqual(mockData.data.current);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('latitude=40.1772'));
  });

  it('should throw if API fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchWeather(0, 0)).rejects.toThrow('API Error');
  });
});
