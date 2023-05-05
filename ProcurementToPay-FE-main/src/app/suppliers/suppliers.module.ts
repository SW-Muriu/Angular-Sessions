import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ParametersModule } from './modules/parameters/parameters.module';
import { CountdownComponent } from './data/share/countdown/countdown.component';


@NgModule({
  declarations: [  
    CountdownComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ParametersModule,
    
  ],
  exports: [CountdownComponent]
})
export class SuppliersModule { }
