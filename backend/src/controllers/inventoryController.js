const product = require("../models/product");

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
  const { codigo, nombre, cantidad, tipo, foto, IVA } = req.body;
  try {
    const result = await product.create({codigo, nombre, cantidad, tipo, foto, IVA });
    res.json({result});
  } catch (error) {
    console.log("An error occurred while adding the product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Actualizar un producto por su código
exports.updateProduct = async (req, res) => {
  const codigo = req.params.codigo;
  const { codigo: newCodigo, nombre, cantidad, tipo, foto, IVA } = req.body;
  try {
    const result = await product.update(
      { codigo: newCodigo, nombre, cantidad, tipo, foto, IVA },
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
