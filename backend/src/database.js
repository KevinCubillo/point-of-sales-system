const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PosGallo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

