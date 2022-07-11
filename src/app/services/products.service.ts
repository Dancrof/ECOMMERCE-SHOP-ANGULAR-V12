import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.URL_SERVER;

  constructor(private http: HttpClient) { }

  //solicitamos a la url del servidor la lista de productos
  getProducts(): Observable<ProductInterface[]>{
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/products`);
  }

  updateStock(productId: number, stock: number): Observable<any>{
    const body = {'stock': stock};
    return this.http.patch<any>(`${this.apiUrl}/products/${productId}`, body);
  }
}
