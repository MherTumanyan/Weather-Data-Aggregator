const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'cities',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      unique: true,
    },
    lat: {
      type: 'float',
    },
    lng: {
      type: 'float',
    },
  },
});
