import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading$ | async">
      <h1>Loadin</h1>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  
  isLoading$ = this.loadingSvc.isLoading$;

  constructor(private loadingSvc: LoadingService) {}

  ngOnInit(): void {}
}
