import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoldProductService {

  constructor(private http: HttpClient) { }
  private url: string = "http://localhost:3000/";

  getAlllSoldProducts(): any {
    return this.http.get(this.url + "soldProducts");
  }

  getSumSoldProducts(): any {
    return this.http.get(this.url + "soldProducts/sum");
  }

  getSumSoldProductsByMonth(): any {
    return this.http.get(this.url + "soldProducts/sum/month");
  }

  getSalesByMonth(): any {
    return this.http.get(this.url + "soldProducts/month");
  } 

  getMostSoldProducts(): any {
    return this.http.get(this.url + "soldProducts/most");
  }

  


}
