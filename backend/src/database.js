const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PosGallo', 'root', 'root', {
  host: '172.17.0.2',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;

