import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoadingService {
  
  isLoading$ = new BehaviorSubject<boolean>(false);

  show(): void {
    this.isLoading$.next(true);
  }

  hidden(): void {
    this.isLoading$.next(false);
  }
}
