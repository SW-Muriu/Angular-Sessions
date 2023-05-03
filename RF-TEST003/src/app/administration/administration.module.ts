import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';


@NgModule({
  declarations: [
    AdministrationComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit (): void
  {
    console.log('/dashboard');
  }

}
