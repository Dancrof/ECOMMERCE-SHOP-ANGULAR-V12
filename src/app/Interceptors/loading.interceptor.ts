import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable} from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingSvc: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.loadingSvc.show();

    return next.handle(request).pipe(
      finalize(() => this.loadingSvc.hidden())
    );
  }
}
