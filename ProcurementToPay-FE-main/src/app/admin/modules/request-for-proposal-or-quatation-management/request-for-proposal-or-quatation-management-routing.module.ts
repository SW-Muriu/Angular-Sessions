import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingProposalOrQuatationsComponent } from './pages/pending-proposal-or-quatations/pending-proposal-or-quatations.component';

const routes: Routes = [
  { path: "pending-proposals-or-proposal", component: PendingProposalOrQuatationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestForProposalOrQuatationManagementRoutingModule { }
