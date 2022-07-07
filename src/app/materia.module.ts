import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
    exports: [
        MatIconModule, 
        MatToolbarModule, 
        MatCardModule, 
        MatButtonModule,
        MatBadgeModule
    ],
})
export class MaterialModule { }
