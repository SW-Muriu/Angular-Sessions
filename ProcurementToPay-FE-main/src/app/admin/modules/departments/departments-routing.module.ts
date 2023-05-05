import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentsComponent } from './departments/departments.component';
import { CreateDepartmentsComponent } from './departments/dialogs/create-departments/create-departments.component';
import { DeleteDepartmentsComponent } from './departments/dialogs/delete-departments/delete-departments.component';
import { ViewDepartmentsComponent } from './departments/dialogs/view-departments/view-departments.component';

const routes: Routes = [
  {path: "", component: DepartmentsComponent},
  {path: "create-departments", component: CreateDepartmentsComponent},
  {path: "delete-departments", component: DeleteDepartmentsComponent},
  {path: "view-departments", component: ViewDepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
