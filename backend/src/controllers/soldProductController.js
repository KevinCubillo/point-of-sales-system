const soldProduct = require("../models/SoldProduct");
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 

// Obtener todos los productos vendidos
exports.getAllSoldProducts = async (req, res) => {
    try {
      const products = await soldProduct.findAll();
      res.json(products);
    } catch (error) {
      console.log("An error occurred while getting all sold products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  // Otener la suma de los productos vendidos
  exports.getSumSoldProducts = async (req, res) => {
    try {
      const products = await soldProduct.sum('total');
      res.json({total: products
      });
    } catch (error) {
      console.log("An error occurred while getting all sold products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  exports.getSumSoldProductsByMonth = async (req, res) => {
    try {
      const products = await soldProduct.findAll({
        attributes: [
          [sequelize.fn('month', sequelize.col('createdAt')), 'month'],
          [sequelize.fn('sum', sequelize.col('total')), 'total']
        ],
        group: [sequelize.fn('month', sequelize.col('createdAt'))]
      });
  
      res.json(products);
    } catch (error) {
      console.log("An error occurred while getting the sum of sold products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  
  //Obtener las ventas por mes
  exports.getSalesByMonth = async (req, res) => {
    try {
      const products = await soldProduct.findAll({
        attributes: [
          [sequelize.fn('month', sequelize.col('createdAt')), 'month'],
          [sequelize.fn('sum', sequelize.col('total')), 'total']
        ],
        group: [sequelize.fn('month', sequelize.col('createdAt'))]
      });
      res.json(products);
    } catch (error) {
      console.log("An error occurred while getting all sold products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //Obtener el producto mas vendido
  exports.getMostSoldProduct = async (req, res) => {
    try {
      const query = `
        SELECT p.descripcion, SUM(s.cantidad) AS totalCantidad
        FROM products p
        JOIN soldProducts s ON p.codigo = s.productoId
        GROUP BY p.descripcion
        ORDER BY totalCantidad DESC
        LIMIT 3;
      `;
      
      const [results, metadata] = await sequelize.query(query);
      
      if (results.length > 0) {
        res.json(results);
      } else {
        res.json({});
      }
    } catch (error) {
      console.log("An error occurred while getting the most sold products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  