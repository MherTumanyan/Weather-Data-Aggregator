const AppDataSource = require('../src/config/db');
const { getAverageWeatherForCity } = require('../src/services/weatherService');

jest.mock('../src/config/db');

describe('getAverageWeatherForCity', () => {
  it('should return average weather values', async () => {
    const mockRepo = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          avgTemp: '20.5',
          avgWindSpeed: '5.5',
          avgWindDir: '90',
        }),
      }),
    };

    AppDataSource.getRepository.mockReturnValue(mockRepo);

    const from = new Date('2024-04-20');
    const to = new Date('2024-04-24');

    const result = await getAverageWeatherForCity('Yerevan', from, to);

    expect(result).toEqual({
      avgTemp: '20.5',
      avgWindSpeed: '5.5',
      avgWindDir: '90',
    });
  });
});
