import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedRfqApplicationComponent } from './pages/all/approved-rfq-application/approved-rfq-application.component';
import { OpenRfqsComponent } from './pages/all/open-rfqs/open-rfqs.component';
import { PendingRfqApplicationsComponent } from './pages/all/pending-rfq-applications/pending-rfq-applications.component';
import { SendQuatationComponent } from './pages/all/send-quatation/send-quatation.component';
import { UpdatePendingQuatationComponent } from './pages/all/update-pending-quatation/update-pending-quatation.component';

const routes: Routes = [
  { path: "open-rfqs", component: OpenRfqsComponent },
  { path: "open-rfqs/send-quatation", component: SendQuatationComponent },
  { path: "approved-rfq-applications", component: ApprovedRfqApplicationComponent },
  { path: "pending-rfq-applications", component: PendingRfqApplicationsComponent },
  { path: "pending-rfq-applications/update-pending-quatation", component: UpdatePendingQuatationComponent },
  { path: "unsuccessful-rfq-applications", component: ApprovedRfqApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfqsRoutingModule { }
