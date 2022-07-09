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
        MatRadioModule
    ],
})
export class MaterialModule { }
