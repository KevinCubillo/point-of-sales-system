import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

interface Item {
  productoId: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  iva: number;
  total: number;
  disponibles: number;
}

interface Invoice {
  id: number;
  fecha: Date;
  dependiente: string;
  productosComprados: Item[];
  subtotal: number;
  iva: number;
  total: number;
}

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoiceHistory();
  }

  getInvoiceHistory(): void {
    this.invoiceService.getInvoices().subscribe(
      invoices => {
        this.invoices = invoices;
      },
      error => {
        console.error(error);
      }
    );
  }

  showInvoiceDetails(invoice: Invoice): void {
    this.selectedInvoice = invoice;
  }
}
