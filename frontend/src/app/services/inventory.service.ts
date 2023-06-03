import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }
  private url: string = "http://localhost:3000/";

  addProduct(productData: product): Observable<any> {
    return this.http.post(this.url + "products/", productData);
  }

  getProducts(): Observable<any>{
    return this.http.get(this.url + "products");
  }

  deleteProduct(productId: String): Observable<any> {
    return this.http.delete(this.url + "products/" + productId);
  }
  
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.url + "images", formData);
  }

  getImageUrl(imageId: string): string {
    return this.url + "images/" + imageId;
  }
  
  getProductById(productId: string): Observable<product> {
    return this.http.get<product>(this.url + "products/" + productId);
  }

  updateProduct(product: product): Observable<any> {
    const url = `${this.url}products/${product.codigo}`;
    return this.http.put(url, product);
  }

}

