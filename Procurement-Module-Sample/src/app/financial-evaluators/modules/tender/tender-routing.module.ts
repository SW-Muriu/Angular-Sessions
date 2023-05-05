import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovedTendersComponent } from "./all/approved-tenders/approved-tenders.component";

const routes: Routes = [
  { path: "approved-tenders", component: ApprovedTendersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenderRoutingModule {}
