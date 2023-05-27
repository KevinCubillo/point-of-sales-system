const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa el objeto sequelize desde el archivo database.js
const Product = require('../models/product');

// Definición del modelo ProductoVendido
const SoldProduct = sequelize.define('SoldProduct', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  iva: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'soldProduct',
  tableName: 'soldProducts',
}

);

SoldProduct.belongsTo(Product, { foreignKey: 'productoId' });

module.exports = SoldProduct;
