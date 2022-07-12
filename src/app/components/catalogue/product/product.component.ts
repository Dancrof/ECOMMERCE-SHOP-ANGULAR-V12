import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //Refercia al la etiqueta p del html con la clase description
  @ViewChild('descriptionRef') descriptionRef!: ElementRef;
  
  //Reciviendo los datos del componente padre
  @Input() product!: ProductInterface;
  //creando el evento personalizado para el envio del producto al carrito
  @Output() addCartProduct = new EventEmitter<ProductInterface>();

  // variable para verificar si la descripcion se muestra completa o no
  isMode: boolean = true;
  
  constructor(private render2: Renderer2) { }

  ngOnInit(): void {
  }

  //estoy emitiendo el producto al carrito
  addCart(): void{
    this.addCartProduct.emit(this.product);
  }

  // metodo para mostrar o ocultar una parte de la descripcion del producto
  moreDescription(): void {
  
    const asDescription = this.descriptionRef.nativeElement;
    
    if(this.isMode){
      this.render2.setStyle(asDescription, '-webkit-line-clamp', '100');
      this.render2.setStyle(asDescription, 'line-clamp', '100');
      
      this.isMode = !this.isMode;
      console.log(this.isMode)
    } else {
      this.render2.setStyle(asDescription, '-webkit-line-clamp', '2');
      this.render2.setStyle(asDescription, 'line-clamp', '2');

      this.isMode = !this.isMode;
      console.log(this.isMode)
    }
  }
}
