const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); // Importa el objeto sequelize desde el archivo database.js

class Product extends Model {}

Product.init(
    {
        codigo : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },

        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        iva: {
            type : DataTypes.FLOAT,
            allowNull: false,
            unique: false,
        },
    },

    {
        sequelize,
        modelName: 'product',
        tableName: 'products',
    }
);

module.exports = Product;