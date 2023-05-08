import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = // sets up routes constant where you define your routes
[
  {
    path: 'first-component', component: FirstComponent
  },
  {
    path: 'second-component', component: SecondComponent
  },
]; 

//Configures NGModules and imports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
