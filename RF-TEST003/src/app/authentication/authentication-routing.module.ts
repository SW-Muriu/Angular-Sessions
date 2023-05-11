import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { DashboardComponent }  from './dashboard.component'

const routes: Routes =
[
{ path: '', component: AuthenticationComponent },
{ path: 'Dashboard', component:  DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
