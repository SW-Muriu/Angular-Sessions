import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRfqApplicationsComponent } from './pages/recieve-rfq-applications/approved-rfq-applications/approved-rfq-applications.component';
import { PendingRfqApplicationsComponent } from './pages/recieve-rfq-applications/pending-rfq-applications/pending-rfq-applications.component';
import { RejectedRfqApplicationsComponent } from './pages/recieve-rfq-applications/rejected-rfq-applications/rejected-rfq-applications.component';
import { RfqApplicationsComponent } from './pages/recieve-rfq-applications/rfq-applications/rfq-applications.component';
import { RfqApprovedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-approved-applications/rfq-approved-applications.component';
import { RfqRejectedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-rejected-applications/rfq-rejected-applications.component';
import { RfqSystemEvaluatedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-system-evaluated-applications/rfq-system-evaluated-applications.component';
import { SystemEvaluatedApplicationsComponent } from './pages/recieve-rfq-applications/system-evaluated-applications/system-evaluated-applications.component';

const routes: Routes = [
  { path: "pending-rfq-applications", component: PendingRfqApplicationsComponent },
  { path: "pending-rfq-applications/:id", component: RfqApplicationsComponent },
  { path: "approved-rfq-applications", component: ApprovedRfqApplicationsComponent },
  { path: "approved-rfq-applications/:id", component: RfqApprovedApplicationsComponent },
  { path: "system-evaluated-rfq-applications", component: SystemEvaluatedApplicationsComponent },
  { path: "system-evaluated-rfq-applications/:id", component: RfqSystemEvaluatedApplicationsComponent },
  { path: "rejected-rfq-applications", component: RejectedRfqApplicationsComponent },
  { path: "rejected-rfq-applications/:id", component: RfqRejectedApplicationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfqsRoutingModule { }
