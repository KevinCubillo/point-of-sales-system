import { Component } from '@angular/core';

interface Item {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  iva: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  invoice: {
    id: number,
    date: Date,
    items: Item[]
  } = {
    id: 123,
    date: new Date(),
    items: [{
      id: 0,
      nombre: 'leche',
      cantidad: 3,
      precio: 1200,
      iva: 250
    }]
  };

  add() {
    this.invoice.items.push({
      id: this.invoice.items.length,
      nombre: '',
      cantidad: 0,
      precio: 0, 
      iva: 0  
    });
  }

  remove(index: number) {
    this.invoice.items.splice(index, 1);
  }

  total(){
    let total = 0;
    this.invoice.items.forEach((item: Item) => {
      total += this.totalPorProducto(item);
    });
    return total;
  }

  totalPorProducto(item: Item) {
    return item.cantidad*(item.precio+item.iva);
  }
  
  pay() {
    console.log('La factura ha sido pagada.');
  }
}
