import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-checkcart',
  templateUrl: './checkcart.component.html',
  styleUrls: ['./checkcart.component.scss']
})
export class CheckcartComponent implements OnInit {

  model = {
    firstName: '',
    lastName: '',
    adress: '',
    city: '',
    country: '',
    phone: '',
    store: ''
  }

  stores: StoreInterface[] = [];
  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.getStores();
  }
  
  onSubmit(): void {
    console.log('guardar');
  }

  private getStores(): void {
    this.dataSvc.getStores()
    .pipe(tap(
      (store: StoreInterface[]) => this.stores = store
    ))
    .subscribe();
  }
}
