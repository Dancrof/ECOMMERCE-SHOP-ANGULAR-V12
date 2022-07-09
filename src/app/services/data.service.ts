import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreInterface } from '../interfaces/store.interface';

@Injectable({providedIn: 'root'})

export class DataService {
    
    private apiUrl = environment.URL_SERVER;

    constructor(private http: HttpClient) { }
    
    // Solicitamos url del servidor la lista de tiendas
    getStores(): Observable<StoreInterface[]> {
       return this.http.get<StoreInterface[]>(`${this.apiUrl}/stores`);
    }
}