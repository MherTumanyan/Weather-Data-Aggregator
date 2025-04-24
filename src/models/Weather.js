const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Weather',
  tableName: 'weather_datas',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    temp: {
      type: 'float',
    },
    windSpeed: {
      type: 'float',
    },
    windDir: {
      type: 'float',
    },
    weatherCode: {
      type: 'int',
    },
    fetchedAt: {
      name: 'fetched_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    city: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: { name: 'city_id' },
      eager: true,
    },
  },
});
