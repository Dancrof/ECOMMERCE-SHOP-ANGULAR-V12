import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailsInterface } from '../interfaces/detailOrder.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class DetailsOrdersService {
    
    private apiUrl = environment.URL_SERVER;
    
    constructor(private http: HttpClient) { }
    
    saveDetailsOrders(detailOrder: DetailsInterface): Observable<DetailsInterface>{
        return this.http.post<DetailsInterface>(`${this.apiUrl}/detailsOrders`,detailOrder);
    }
}