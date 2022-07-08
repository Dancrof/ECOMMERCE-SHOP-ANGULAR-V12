import { Component, OnInit } from '@angular/core';
import { TransactionInterface } from 'src/app/interfaces/transaction.interface';

@Component({
  selector: 'app-details-products-cart',
  templateUrl: './details-products-cart.component.html',
  styleUrls: ['./details-products-cart.component.scss']
})
export class DetailsProductsCartComponent implements OnInit {

  displayedColumns = ['item', 'cost'];
  transactions: TransactionInterface[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
