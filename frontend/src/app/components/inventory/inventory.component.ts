import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  filtro: string = '';
  codigo: string = '';
  nombre: string = '';
  categoria: string = '';
  cantidad: number = 0;
  precio: number = 0.0;
  iva: number = 0.0;
  archivo: string = '';

  cantidadProductos: number = 0;
  disponible: number = 0;
  salidas: number = 0;
  entradas: number = 0;
  productos: product[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  limpiar(): void {
    this.codigo = '';
    this.nombre = '';
    this.cantidad = 0;
    this.precio = 0.0;
    this.categoria = '';
    this.archivo = '';
    this.iva = 0.0;
  }

  cancelar(): void {
    const addForm = document.getElementById('addForm') as HTMLElement | null;
    if (addForm) {
      addForm.style.display = "none";
    }
    this.limpiar();
  }

  mostrar(): void {
    const addForm = document.getElementById('addForm') as HTMLElement | null;
    if (addForm) {
      addForm.style.display = "flex";
    }
  }

  bloque(): void {
    const items = document.getElementsByClassName('itemLV');
    
    Array.from(items).forEach((element: Element) => {
      element.classList.remove('itemLV');
      element.classList.add('itemBV');
    });
  }

  lista(): void {
    const items = document.getElementsByClassName('itemBV');
    
    Array.from(items).forEach((element: Element) => {
      element.classList.remove('itemBV');
      element.classList.add('itemLV');
    });
  }

  agregarProducto(): void {
    const newProduct: product = {
      codigo: uuidv4(),
      descripcion: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      tipo: this.categoria,
      foto: this.archivo,
      iva: this.iva
    };
  
    this.inventoryService.addProduct(newProduct).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.entradas++; // Incrementar la variable entradas en 1
        this.cancelar();
        this.getProducts();
        this.limpiar();
      },
      error => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Obtenemos el archivo seleccionado
    const formData: FormData = new FormData(); // Creamos un objeto FormData para enviar la imagen
    this.archivo = file.name; // Asignamos el nombre del archivo a la variable 'archivo'
    formData.append('file', file); // Agregamos el archivo al FormData
  
    this.inventoryService.uploadFile(file).subscribe(
      response => {
        console.log('Imagen almacenada:', response);
      },
      error => {
        console.error('Error al almacenar la imagen:', error);
      }
    );
  }

  getProducts(): void {
    this.inventoryService.getProducts().subscribe(
      response => {
        this.productos = response;
        this.cantidadProductos = this.productos.length;
        this.disponible = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  eliminarProducto(producto: product): void {
    this.inventoryService.deleteProduct(producto.codigo).subscribe(
      response => {
        console.log('Producto eliminado:', response);
        this.getProducts();
        this.salidas++; // Incrementar la variable salidas en 1
        
      },
      error => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  getImageUrl(imageId: string): string {
    return this.inventoryService.getImageUrl(imageId);
  }

  cargarProducto(producto: product): void {
    this.codigo = producto.codigo;
    this.nombre = producto.descripcion;
    this.categoria = producto.tipo;
    this.cantidad = producto.cantidad;
    this.precio = producto.precio;
    this.iva = producto.iva;
    // Puedes asignar el valor de 'this.archivo' si es necesario.
    this.mostrarActualizar();
    this.mostrar();
  }

  mostrarActualizar():void{
    const addButton = document.getElementById('addP') as HTMLElement | null;
    const updateButton = document.getElementById('updateP') as HTMLElement | null;
    if (updateButton) {
      updateButton.style.display = "flex";
    }
    if (addButton) {
      addButton.style.display = "none";
    }
  }

  mostrarAgregar():void{
    const addButton = document.getElementById('addP') as HTMLElement | null;
    const updateButton = document.getElementById('updateP') as HTMLElement | null;
    if (updateButton) {
      updateButton.style.display = "none";
    }
    if (addButton) {
      addButton.style.display = "flex";
    }
    this.mostrar();
  }

  
  actualizarProducto(): void {
    const updatedProduct: product = {
      codigo: this.codigo,
      descripcion: this.nombre,
      cantidad: this.cantidad,
      precio: this.precio,
      tipo: this.categoria,
      foto: this.archivo,
      iva: this.iva
    };
  
    this.inventoryService.updateProduct(updatedProduct).subscribe(
      response => {
        console.log('Producto actualizado:', response);
        this.cancelar();
        this.getProducts();
        this.limpiar();
      },
      error => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }
  
  

}
