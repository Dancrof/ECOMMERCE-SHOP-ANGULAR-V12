import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { AuthInterface } from '../interfaces/auth.interface';
import { UserInterface } from '../interfaces/user.interface';
import { catchError } from 'rxjs/operators';

import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.URL_SERVER;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // logea con un usuario y contraseña
  login(): Observable<AuthInterface> {
    return this.http
      .post<AuthInterface>(`${this.apiUrl}/login`, {
        email: 'user@example.com',
        password: '1234',
      })
      .pipe(catchError(this.handleError));
  }

  //se regitras un nuevo usuario
  singIn(): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(
        `${this.apiUrl}/users`,
        {
          id: uuid(),
          name: 'Zoñiga',
          email: 'zoñiga@.me',
          password: 53489,
          roleId: 2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  //verifiva si rl token del usuario aun es valido
  verifity(): Observable<string> {
    return this.http
      .get<string>(
        `${this.apiUrl}/verify`,
        {
          headers: {
            'Content-Type': 'application/json',
            'token': `${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  //elimina el token y lo redirige al home
  logout(): void{
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

  //muestra si hay un error en la peticion
  handleError(error: HttpErrorResponse) {
    alert(`No se realizo la peticion -> ${error.message}`);
    return throwError(error);
  }
}
