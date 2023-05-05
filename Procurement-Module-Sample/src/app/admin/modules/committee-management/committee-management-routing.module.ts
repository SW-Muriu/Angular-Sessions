import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserToCommitteComponent } from './pages/add-user-to-committe/add-user-to-committe.component';
import { PendingCommitteeMembersComponent } from './pages/pending-committee-members/pending-committee-members.component';
import { ViewCommitteeMemebersComponent } from './pages/view-committee-memebers/view-committee-memebers.component';

const routes: Routes = [
  { path: "pending-committee-members", component: PendingCommitteeMembersComponent},
  { path: "add-user-to-committe", component: AddUserToCommitteComponent},
  { path: "view-committee-members", component: ViewCommitteeMemebersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteeManagementRoutingModule { }
