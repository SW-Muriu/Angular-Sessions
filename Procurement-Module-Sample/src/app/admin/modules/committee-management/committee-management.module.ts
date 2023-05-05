import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitteeManagementRoutingModule } from './committee-management-routing.module';
import { PendingCommitteeMembersComponent } from './pages/pending-committee-members/pending-committee-members.component';
import { AddUserToCommitteComponent } from './pages/add-user-to-committe/add-user-to-committe.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCommitteeMemebersComponent } from './pages/view-committee-memebers/view-committee-memebers.component';
import { AddCommitteeMemberComponent } from './pages/dialogs/add-committee-member/add-committee-member.component';
import { UserDetailsComponent } from './pages/dialogs/user-details/user-details.component';
import { RemoveMemberFromCommitteeComponent } from './pages/dialogs/remove-member-from-committee/remove-member-from-committee.component';


@NgModule({
  declarations: [
    PendingCommitteeMembersComponent,
    AddUserToCommitteComponent,
    ViewCommitteeMemebersComponent,
    AddCommitteeMemberComponent,
    UserDetailsComponent,
    RemoveMemberFromCommitteeComponent
  ],
  imports: [
    CommonModule,
    CommitteeManagementRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
  ]
})
export class CommitteeManagementModule { }
