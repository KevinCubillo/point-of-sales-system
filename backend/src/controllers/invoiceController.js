const Invoice = require('../models/Invoice');
const SoldProduct = require('../models/SoldProduct');
const Product = require('../models/product');


// Crear una nueva factura
exports.createInvoice = async (req, res) => {
    const { fecha, dependiente, subtotal, iva, total, productos } = req.body;
    try {
      // Crear la factura
      const invoice = await Invoice.create({ fecha, dependiente, subtotal, iva, total });
      // Crear los productos vendidos asociados a la factura
      for (const producto of productos) {
        const productoVendido = await SoldProduct.create({
          cantidad: producto.cantidad,
          precioUnitario: producto.precioUnitario,
          iva: producto.iva,
          total: producto.total,
          facturaId: invoice.id,
          productoId: producto.productoId,
        });
      }
      // Consultar los productos vendidos asociados a la factura
      const facturaRespuesta = await Invoice.findByPk(invoice.id, {
        include: { model: SoldProduct, as: 'soldProducts' },
      });
      res.json({
        message: "Invoice created successfully",
        invoice: facturaRespuesta
      });
    } catch (error) {
      console.log("An error occurred while creating the invoice:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  exports.getAllInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.findAll({
        include: [
          {
            model: SoldProduct,
            as: 'soldProducts',
            include: {
              model: Product,
              as: 'product',
              attributes: ['descripcion'],
            },
          },
        ],
      });
      res.json(invoices);
    } catch (error) {
      console.log("An error occurred while getting all invoices:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
// Obtener una factura por su ID con los productos vendidos asociados
exports.getInvoiceById = async (req, res) => {
    const id = req.params.id;
    try {
      const invoice = await Invoice.findByPk(id, {
        include: [
          {
            model: SoldProduct,
            as: 'soldProducts',
            include: {
              model: Product,
              as: 'product',
              attributes: ['descripcion'],
            },
          },
        ],
      });
      if (invoice) {
        res.json(invoice);
      } else {
        res.status(404).json({ error: "Invoice not found" });
      }
    } catch (error) {
      console.log("An error occurred while getting the invoice:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  // Eliminar una factura por su ID y los productos vendidos asociados
  exports.deleteInvoice = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Invoice.destroy({ where: { id } });
      if (result === 1) {
        // Eliminar los productos vendidos asociados a la factura
        await SoldProduct.destroy({ where: { facturaId: id } });
        res.json({ message: "Invoice and associated sold products deleted successfully" });
      } else {
        res.status(404).json({ error: "Invoice not found" });
      }
    } catch (error) {
      console.log("An error occurred while deleting the invoice:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


