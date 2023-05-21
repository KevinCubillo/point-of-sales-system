const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa el objeto sequelize desde el archivo database.js
const SoldProduct = require('./SoldProduct');

// Definición del modelo Factura
const Invoice = sequelize.define('Invoice', {
  fecha: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  dependiente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtotal: {
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
  modelName: 'invoice',
  tableName: 'invoices',
}
);

Invoice.hasMany(SoldProduct, { as: 'soldProducts', foreignKey: 'facturaId' });

module.exports = Invoice;

