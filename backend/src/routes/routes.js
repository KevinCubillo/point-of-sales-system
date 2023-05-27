const express = require("express");
const router = express.Router();

// Importar controladores
const inventoryController = require("../controllers/inventoryController");
const authController = require("../controllers/authController");
const invoiceController = require("../controllers/invoiceController");
const Sold = require("../controllers/soldProductController");

// Rutas para el inventario
router.get("/products", inventoryController.getAllProducts);
router.get("/products/:codigo", inventoryController.getProductById);
router.post("/products", inventoryController.addProduct);
router.put("/products/:codigo", inventoryController.updateProduct);
router.delete("/products/:codigo", inventoryController.deleteProduct);
router.get("/images/:imageId",inventoryController.getImage);

// Rutas para las facturas
router.post('/invoices', invoiceController.createInvoice);
router.get('/invoices', invoiceController.getAllInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.delete('/invoices/:id', invoiceController.deleteInvoice);

// Rutas para la autenticación
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/userExists", authController.userExists);

// Rutas para los productos vendidos
router.get("/soldProducts", Sold.getAllSoldProducts);
router.get("/soldProducts/sum", Sold.getSumSoldProducts);
router.get("/soldProducts/sum/month", Sold.getSumSoldProductsByMonth);
router.get("/soldProducts/month", Sold.getSalesByMonth);
router.get("/soldProducts/most", Sold.getMostSoldProduct);


module.exports = router;
