import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';
import { ViewApplicationComponent } from './dialogs/view-application/view-application.component';
import { PendingApplicationsComponent } from './pending-applications/pending-applications.component';
import { RejectedApplicationsComponent } from './rejected-applications/rejected-applications.component';

const routes: Routes = [
  { path: "pending", component: PendingApplicationsComponent },
  { path: "approved", component: ApprovedApplicationsComponent },
  { path: "rejected", component: RejectedApplicationsComponent },
  { path: "view-application", component: ViewApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecieveApplicationsRoutingModule { }
