import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="lds-roller" *ngIf="isLoadin$ | async">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  
  isLoadin$ = this.loadingSvc.isLoading$;

  constructor(private loadingSvc: LoadingService) {}

}
