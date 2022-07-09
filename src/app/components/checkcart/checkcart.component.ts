import { Component, OnInit } from '@angular/core';

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
  }

  constructor() { }

  ngOnInit(): void {
  }
  
  ngSubmit(): void {
    console.log('guardar');
  }
}
