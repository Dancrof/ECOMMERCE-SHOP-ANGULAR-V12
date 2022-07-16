import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-options-menu',
  template: `
    <ul>
      <li
        (click)="hiddenMenu()"
        [routerLink]="[option.urlComponent]"
        *ngFor="let option of listOptionMenu"
      >
        <mat-icon>
          {{ option.iconOption }}
        </mat-icon>
        {{ option.nameOption }}
      </li>
    </ul>
  `,
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent implements OnInit {
  
  @Input() hiddenMenuRef!: HTMLDivElement;

  //lista de opciones del menu
  listOptionMenu = [
    {
      nameOption: 'Admin',
      iconOption: 'supervisor_account',
      urlComponent: '/catalogo',
    },
    {
      nameOption: 'Catalogo',
      iconOption: 'shopping_basket',
      urlComponent: '/catalogo',
    },
    {
      nameOption: 'Conocenos',
      iconOption: 'business',
      urlComponent: '/catalogo',
    },
    {
      nameOption: 'Contactanos',
      iconOption: 'chat',
      urlComponent: '/catalogo',
    },
  ];

  constructor(
    private navbarSvc: NavbarService,
    private render2: Renderer2
  ) {}

  ngOnInit(): void {
    
  }

  //oculta el menu al selecionar una opcion
  hiddenMenu(): void{
    this.render2.removeClass(this.hiddenMenuRef, 'active')
  }
}
