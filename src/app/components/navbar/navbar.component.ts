import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //Reciviendo la referencia del componente menu
  @Input() reftogglemenu!: HTMLDivElement;

  constructor(
    private render2: Renderer2,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
  }

  //ocultar o mostrar el menu del navbar
  activeToggleMenu(): void{

    if(this.reftogglemenu.className != 'toggle__menu active'){
      this.render2.addClass(this.reftogglemenu, 'active')
    } else {
      this.render2.removeClass(this.reftogglemenu, 'active')
    }
  }

  verifica(): void {
    this.authSvc.verifity().pipe(
      tap(res => console.log(res))
    ).subscribe();
  }
}
