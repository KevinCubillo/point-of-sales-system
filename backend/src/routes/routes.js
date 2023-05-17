const express = require("express");
const router = express.Router();

// Importar controladores
const inventoryController = require("../controllers/inventoryController");
const authController = require("../controllers/authController");

// Rutas para el inventario
router.get("/products", inventoryController.getAllProducts);
router.get("/products/:codigo", inventoryController.getProductById);
router.post("/products", inventoryController.addProduct);
router.put("/products/:codigo", inventoryController.updateProduct);
router.delete("/products/:codigo", inventoryController.deleteProduct);

// Rutas para la autenticación
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/userExists", authController.userExists);

module.exports = router;
