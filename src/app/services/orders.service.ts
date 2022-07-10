import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class OrdersService {
    
    private apiUrl = environment.URL_SERVER;
    
    constructor(private http: HttpClient) { }
    
    saveOrder(order: OrderInterface): Observable<OrderInterface>{
        return this.http.post<OrderInterface>(`${this.apiUrl}/orders`, order);
    }
}