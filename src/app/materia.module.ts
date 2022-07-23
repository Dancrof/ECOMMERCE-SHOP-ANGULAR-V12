import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
    exports: [
        MatIconModule, 
        MatToolbarModule, 
        MatCardModule, 
        MatButtonModule,
        MatBadgeModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatRadioModule,
        MatGridListModule,
        MatChipsModule,
        MatStepperModule
    ],
})
export class MaterialModule { }
