import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductInterface } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.URL_SERVER;

  constructor(
    private http: HttpClient,
  ) {}

  //solicitamos a la url del servidor la lista de productos
  getProducts(): Observable<ProductInterface[]> {
    return this.http
      .get<ProductInterface[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError));
  }

  //solicitamos a la url del servidor un producto especifico por su id
  getProduct(id: number): Observable<ProductInterface> {
    return this.http
      .get<ProductInterface>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError));
  }

  //solicitmos actualizar el stock de un producto
  updateStock(productId: number, stock: number): Observable<any> {
    const body = { stock: stock };
    return this.http.patch<any>(`${this.apiUrl}/products/${productId}`, body);
  }

  //muestra si hay un error en la peticion
  handleError(error: HttpErrorResponse) {
    alert(`No se realizo la peticion -> ${error.message}`);
    return throwError(error);
  }
}
