import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  template: `
    <ng-container>
      <button (click)="registrar()">Registro</button>
      <button *ngIf="!isSesion" (click)="logear()">Iniciar sesion</button>
      <span *ngIf="isSesion">
        <button
          mat-icon-button
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu"
        >
          <mat-icon>face</mat-icon>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <h4>Bryan Caicedo</h4>
          <button mat-menu-item *ngFor="let option of listOption">
            <mat-icon>{{ option.icon }}</mat-icon>
            <span>{{ option.optionName }}</span>
          </button>
          <button mat-menu-item  (click)="exitSesion()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Cerrar sesion</span>
          </button>
        </mat-menu>
      </span>
    </ng-container>
  `,
  styleUrls: ['../navbar/navbar.component.scss'],
})
export class UserComponent implements OnInit {
  //muestra las opciones del menu si esta logeado
  isSesion: boolean = false;

  //lista de opciones del menu de usuario
  listOption = [
    {
      icon: 'account_box',
      optionName: 'Perfil',
      exit: ""
    }
  ];

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {}

  logear(): void {
    this.authSvc
      .login()
      .pipe(
        tap((res) => {
          console.log(res);
          localStorage.setItem("token", res.token_acces);
        })
      )
      .subscribe(() => (this.isSesion = true));
  }

  registrar(): void {
    this.authSvc
      .singIn()
      .pipe(tap((res) => console.log(res)))
      .subscribe();
  }

  exitSesion(): void{
    this.authSvc.logout();
  }
}
