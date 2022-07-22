import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  product!: ProductInterface;

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        const id: number = params['id']
        const name: string = params['name']
        this.getProduct(id)
      }
    );
  }

  getProduct(idParam: number): void{
    this.productSvc.getProduct(idParam).pipe(
      tap((productFind: ProductInterface) => {
        this.product = productFind
        console.log(this.product)
      })
    ).subscribe();
  }

}
