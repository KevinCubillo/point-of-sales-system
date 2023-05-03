import { Component } from '@angular/core';

interface Item {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  
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
      precio: 1200
    }]
  };

  add() {
    this.invoice.items.push({
      id: 0,
      nombre: '',
      cantidad: 1,
      precio: 0
    });
  }

  remove(index: number) {
    this.invoice.items.splice(index, 1);
  }

  total() {
    let total = 0;
    this.invoice.items.forEach((item: Item) => {
      total += item.cantidad * item.precio;
    });
    return total;
  }

  pay() {
    console.log('La factura ha sido pagada.');
  }
}
