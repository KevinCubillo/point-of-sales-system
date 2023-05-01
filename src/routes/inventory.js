//Imports
const express = require("express");
const router = express.Router();
const inventoryCtrl = require("../controllers/inventory");
//------------------------------------------------

//Rutas

//Ruta para obtener todos los productos de la base de datos
router.get('/products', inventoryCtrl.getProducts);

//Ruta para obtener un producto en especifico por su código
router.get('/product/:id', inventoryCtrl.getProduct);

//Ruta para agregar un nuevo producto
router.post('/product', inventoryCtrl.createProduct);

//Ruta para actualizar un producto por su código
router.put('/product', inventoryCtrl.updateProduct);

//Ruta para eliminar un producto por su código
router.delete('/product/:id',inventoryCtrl.deleteProduct);

module.exports = router;

