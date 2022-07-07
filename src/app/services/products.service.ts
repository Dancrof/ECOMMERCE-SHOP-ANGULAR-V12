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

  getProducts(): Observable<any>{
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/products`);
  }
}
