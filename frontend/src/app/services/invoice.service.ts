import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private url: string = "http://localhost:3000/";

  getProductById(productId: number): Observable<any> {
    return this.http.get(this.url + "products/" + productId);
  }

  updateProductQuantity(productId: number, cantidad: number): Observable<any> {
    const data = {cantidad: cantidad };
    return this.http.put(this.url + "products/" + productId, data);
  }

}
