import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Reciviendo los datos del componente padre
  @Input() product!: ProductInterface;
  //creando el evento personalizado para el envio del producto al carrito
  @Output() addCartProduct = new EventEmitter<ProductInterface>();

  constructor() { }

  ngOnInit(): void {
  }

  //estoy emitiendo el producto al carrito
  addCart(): void{
    this.addCartProduct.emit(this.product);
  }
}
