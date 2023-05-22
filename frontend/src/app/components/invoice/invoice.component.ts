import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { ToastrService } from 'ngx-toastr';



interface Item {
  productoId: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  iva: number;
  total: number;
  disponibles: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})

export class InvoiceComponent {
  constructor(private invoiceService: InvoiceService) { }

  invoice: {
    fecha: Date,
    dependiente: string,
    productosComprados: Item[]
  } = {
    fecha: new Date(),
    dependiente: '',
    productosComprados: []
  };

  add() {
    this.invoice.productosComprados.push({
      productoId: this.invoice.productosComprados.length,
      descripcion: '',
      cantidad: 0,
      precioUnitario: 0, 
      iva: 0,
      total: 0,
      disponibles: 0
    });
  }

  remove(index: number) {
    this.invoice.productosComprados.splice(index, 1);
  }

  totalPorProducto(item: Item) {
    item.total = item.cantidad*(item.precioUnitario+item.iva);
    return parseFloat((item.total).toFixed(2));
  }

  subtotal() {
    let subtotal = 0;
    this.invoice.productosComprados.forEach((item: Item) => {
      subtotal += item.cantidad * item.precioUnitario;
    });
    return parseFloat(subtotal.toFixed(2));
  }
  

  iva() {
    let iva = 0;
    this.invoice.productosComprados.forEach((item: Item) => {
      iva += item.cantidad * item.iva;
    });
    return parseFloat(iva.toFixed(2));
  }
  
 
  total() {
    return this.subtotal() + this.iva();
  }

  pay() {
    this.invoice.productosComprados.forEach((item: Item) => {
      this.invoiceService.updateProductQuantity(item.productoId, item.disponibles - item.cantidad).subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });  
    });
    this.createInvoice();
  }
  
  createInvoice() {
    // Crear el objeto invoiceData con los datos de la factura
    const invoiceData = {
      fecha: new Date(),
      dependiente: this.invoice.dependiente,
      subtotal: this.subtotal(),
      iva: this.iva(),
      total: this. total(),
      productos: this.invoice.productosComprados
    };
    console.log(invoiceData);
    // Llamar al método createInvoice del servicio
    this.invoiceService.createInvoice(invoiceData).subscribe(response => {
      console.log(response);
      // Restablecer los valores de la factura después de crearla
      this.resetInvoice();
    }, error => {
      console.error(error);
    });
  }
  
  resetInvoice() {
    this.invoice = {
      fecha: new Date(),
      dependiente: '',
      productosComprados: []
    };
  }
  
  onProductCodeChange(codigo: number, item: Item) {
    if (codigo) {
      this.invoiceService.getProductById(codigo).subscribe(
        response => {
          item.descripcion = response.nombre;
          item.precioUnitario = response.precio;
          item.iva = response.iva * item.precioUnitario;
          item.disponibles = response.cantidad;
        },
        error => {
          console.error(error);
          // Establecer los campos del item en vacío
          item.descripcion = "";
          item.precioUnitario = 0;
          item.iva = 0;
          item.disponibles = 0;
        }
      );
    }
  }

}
  
