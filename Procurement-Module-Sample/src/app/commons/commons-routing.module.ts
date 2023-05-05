import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "tender",
    loadChildren: () =>
      import("./modules/tender/tender.module").then(
        (m) => m.TenderModule
      ),
  },
  {
    path: "rfqs",
    loadChildren: () =>
      import("./modules/rfqs/rfqs.module").then(
        (m) => m.RfqsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsRoutingModule { }
