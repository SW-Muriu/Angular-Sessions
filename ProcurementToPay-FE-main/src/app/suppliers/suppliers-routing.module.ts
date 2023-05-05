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
    path: "parameters",
    loadChildren: () =>
      import("./modules/parameters/parameters.module").then(
        (m) => m.ParametersModule
      ),
  },

  {
    path: "prequalifications",
    loadChildren: () =>
      import("./modules/prequalifications/prequalifications.module").then(
        (m) => m.PrequalificationsModule
      ),
  },
  {
    path: "rfqs",
    loadChildren: () =>
      import("./modules/rfqs/rfqs.module").then(
        (m) => m.RfqsModule
      ),
  },
  {
    path: "tenders",
    loadChildren: () =>
      import("./modules/tenders/tenders.module").then(
        (m) => m.TendersModule
      ),
  },





 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
