import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestForProposalOrQuatationManagementRoutingModule } from './request-for-proposal-or-quatation-management-routing.module';
import { PendingProposalOrQuatationsComponent } from './pages/pending-proposal-or-quatations/pending-proposal-or-quatations.component';


@NgModule({
  declarations: [
    PendingProposalOrQuatationsComponent
  ],
  imports: [
    CommonModule,
    RequestForProposalOrQuatationManagementRoutingModule
  ]
})
export class RequestForProposalOrQuatationManagementModule { }
