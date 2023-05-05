import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: RolesComponent,
  },
  {
    path: "add-role",
    canActivate: [AuthGuard],
    component: AddRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
