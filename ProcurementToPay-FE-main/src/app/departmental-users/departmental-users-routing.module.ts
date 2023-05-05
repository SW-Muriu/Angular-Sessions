import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "need-management",
    loadChildren: () =>
      import("./modules/need/need.module").then(
        (m) => m.NeedModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentalUsersRoutingModule { }
