import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //Reciviendo la referencia del componente padre
  @Input() reftogglemenu!: HTMLUListElement;


  private isMode: boolean = true

  constructor(private render2: Renderer2) { }

  ngOnInit(): void {
  }

  //ocultar o mostrar el menu del navbar
  activeToggleMenu(): void{
    if(this.isMode){
      this.render2.setStyle(this.reftogglemenu, "width", "250px");
      this.render2.setStyle(this.reftogglemenu, "transform", "translateX(0)");
      this.isMode = !this.isMode
    } else {
      this.render2.setStyle(this.reftogglemenu, "transform", "translateX(-150px)");
      this.render2.setStyle(this.reftogglemenu, "width", "0");
      this.isMode = !this.isMode
    }
  }
}
