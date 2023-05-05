import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedNeedsComponent } from './pages/requisition-of-need-management/approved-needs/approved-needs.component';
import { FullfilledNeedsComponent } from './pages/requisition-of-need-management/fullfilled-needs/fullfilled-needs.component';
import { NeedDetailsComponent } from './pages/requisition-of-need-management/need-details/need-details.component';
import { NeedRequisitionFormComponent } from './pages/requisition-of-need-management/need-requisition-form/need-requisition-form.component';
import { PendingNeedsComponent } from './pages/requisition-of-need-management/pending-needs/pending-needs.component';
import { RejectedNeedsComponent } from './pages/requisition-of-need-management/rejected-needs/rejected-needs.component';
import { UpdateNeedComponent } from './pages/requisition-of-need-management/update-need/update-need.component';

const routes: Routes = [
  { path: "need-requisition-form", component: NeedRequisitionFormComponent },
  { path: "pending-needs", component: PendingNeedsComponent },
  { path: "approved-needs", component: ApprovedNeedsComponent },
  { path: "rejected-needs", component: RejectedNeedsComponent },
  { path: "full-filled-needs", component: FullfilledNeedsComponent },
  { path: "need-details/:id", component: NeedDetailsComponent },
  { path: "update-need/:id", component: UpdateNeedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedRoutingModule { }
