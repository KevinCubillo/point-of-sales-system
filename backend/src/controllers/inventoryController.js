const product = require("../models/product");
const multer = require('multer');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    res.json(products);
  } catch (error) {
    console.log("An error occurred while getting all products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Obtener un producto por su código
exports.getProductById = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const result = await product.findByPk(codigo);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log("An error occurred while getting the product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  const { codigo, descripcion, cantidad, precio, tipo, foto, iva } = req.body;
  try {
    const result = await product.create({codigo, descripcion, cantidad, precio, tipo, foto, iva });
    res.json({result});
  } catch (error) {
    console.log("An error occurred while adding the product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Actualizar un producto por su código
exports.updateProduct = async (req, res) => {
  console.log(req.body);
  const codigo = req.params.codigo;
  const { codigo: newCodigo, descripcion, cantidad, precio, tipo, foto, iva } = req.body;
  try {
    const result = await product.update(
      { codigo: newCodigo, descripcion, cantidad, precio, tipo, foto, iva },
      { where: { codigo } }
    );
    if (result[0] === 1) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log("An error occurred while updating the product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Eliminar un producto por su código
exports.deleteProduct = async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const result = await product.destroy({ where: { codigo } });
    if (result === 1) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log("An error occurred while deleting the product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//Obtener imagenes
const path = require('path');
exports.getImage = async (req,res) =>{
  const imageId = req.params.imageId;
  const imagePath = path.join(__dirname, '../images', imageId); // Reemplaza 'ruta_a_tus_imagenes' con la ruta real donde se almacenan las imágenes

  res.sendFile(imagePath);
}


