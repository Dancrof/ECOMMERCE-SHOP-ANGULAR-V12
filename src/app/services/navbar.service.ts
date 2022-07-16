import { EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({ providedIn: 'root' })

export class NavbarService {

  //creando el evento personalizado para el envio del producto al carrito
  @Output() showHiddenMenu: EventEmitter<any> = new EventEmitter();

  constructor() {}

}
