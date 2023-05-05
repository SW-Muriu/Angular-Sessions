import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovedRfqsComponent } from "./pages/all/approved-rfqs/approved-rfqs.component";
import { CreateRfqComponent } from "./pages/all/create-rfq/create-rfq.component";
import { PendingRfqsComponent } from "./pages/all/pending-rfqs/pending-rfqs.component";
import { PostedRfqsComponent } from "./pages/all/posted-rfqs/posted-rfqs.component";
import { RejectedRfqsComponent } from "./pages/all/rejected-rfqs/rejected-rfqs.component";

const routes: Routes = [
  { path: "create-rfq", component: CreateRfqComponent },
  { path: "pending-rfqs", component: PendingRfqsComponent },
  { path: "approved-rfqs", component: ApprovedRfqsComponent },
  { path: "posted-rfqs", component: PostedRfqsComponent },
  { path: "rejected-rfqs", component: RejectedRfqsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RfqsRoutingModule {}
