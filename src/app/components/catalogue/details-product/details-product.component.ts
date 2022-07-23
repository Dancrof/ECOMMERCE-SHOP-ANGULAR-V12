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

  // el producto con sus porpiedad iniciales
  product: ProductInterface = {
    id: 0,
    name: '',
    galeryImg: [],
    price: 0,
    description: '',
    categoryId: 0,
    stock: 0,
    quantity: 0
  };
  
  //variable que guardar el valos del primer elemento del array de imgs
  fotoSeleccionada: string | undefined;
  //indiceSeleccionado: number = 0;

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

  //optengo el producto selecionado del catalogo y mustro sus detalles
  getProduct(idParam: number): void{
    this.productSvc.getProduct(idParam).pipe(
      tap((productFind: ProductInterface) => {
        this.product = productFind
        
        //optengo el primer elemento del array de img
        this.fotoSeleccionada = this.product.galeryImg?.shift()
        //muestro por consola el producto
        console.log(this.product)
      })
    ).subscribe();
  }

}
