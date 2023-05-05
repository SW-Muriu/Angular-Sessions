import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovedRfqsComponent } from "./pages/all/approved-rfqs/approved-rfqs.component";
import { PendingRfqsComponent } from "./pages/all/pending-rfqs/pending-rfqs.component";
import { RejectedRfqsComponent } from "./pages/all/rejected-rfqs/rejected-rfqs.component";
import { PendingRfqApplicationsComponent } from "./pages/rfq-applications/pending-rfq-applications/pending-rfq-applications.component";
import { RfqsComponent } from './pages/rfq-applications/rfqs/rfqs.component';

const routes: Routes = [
  { path: "pending-rfqs", component: PendingRfqsComponent },
  { path: "approved-rfqs", component: ApprovedRfqsComponent },
  { path: "rejected-rfqs", component: RejectedRfqsComponent },
  { path: "open-rfqs", component: RejectedRfqsComponent },
  { path: "closed-rfqs", component: RejectedRfqsComponent },
  { path: "pending-rfq-applications", component: PendingRfqApplicationsComponent },
  { path: "pending-rfq-applications/:id", component: RfqsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RfqsRoutingModule {}
