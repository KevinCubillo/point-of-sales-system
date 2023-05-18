import { Component } from '@angular/core';
import { ProductService } from '../../services/invoice.service';
import { preserveWhitespacesDefault } from '@angular/compiler';


interface Item {
  codigo: number;
  nombre: string;
  cantidad: number;
  precio: number;
  iva: number;
  disponibles: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})

export class InvoiceComponent {
  constructor(private productService: ProductService) { }

  invoice: {
    codigo: number,
    date: Date,
    items: Item[]
  } = {
    codigo: 123,
    date: new Date(),
    items: []
  };

  add() {
    this.invoice.items.push({
      codigo: this.invoice.items.length,
      nombre: '',
      cantidad: 0,
      precio: 0, 
      iva: 0,
      disponibles: 0
    });
  }

  remove(index: number) {
    this.invoice.items.splice(index, 1);
  }

  total() {
    let total = 0;
    this.invoice.items.forEach((item: Item) => {
      total += this.totalPorProducto(item);
    });
    return total;
  }
  
  totalPorProducto(item: Item) {
    return parseFloat((item.cantidad*(item.precio+item.iva)).toFixed(2));
  }
  
  pay() {
    this.invoice.items.forEach((item: Item) => {
      this.productService.updateProductQuantity(item.codigo, item.disponibles - item.cantidad).subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    });
    
  }

  onProductCodeChange(codigo: number, item: Item) {
    if (codigo) {
      this.productService.getProductById(codigo).subscribe(response => {
        item.nombre = response.nombre;
        item.precio = response.precio;
        item.iva = response.iva * item.precio;
        item.disponibles = response.cantidad;
      }, error => {
        console.error(error);
      });
    }
  }
  
}
