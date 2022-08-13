import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit, OnDestroy {

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
  
  //mostrar cargando si aun no llegan los productos
  isLoading: boolean = true;

  //variable que guardar el valos del primer elemento del array de imgs
  fotoSeleccionada: string | undefined;
  //indiceSeleccionado: number = 0;

  //obserbable para desuscribir
  onDestroy$: Subject<boolean> = new Subject();
  
  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
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
      })
    ).subscribe(() => this.isLoading = false);
  }
  
  // desturye el componenet cuando canbiamos de ruta
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
