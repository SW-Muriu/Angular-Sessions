import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnounceRoutingModule } from './announce-routing.module';
import { PendingAnnouncementsComponent } from './pending-announcements/pending-announcements.component';
import { RejectedAnnouncementsComponent } from './rejected-announcements/rejected-announcements.component';
import { ApprovedAnnouncementsComponent } from './approved-announcements/approved-announcements.component';
import { AddAnnouncementsComponent } from './add-announcements/add-announcements.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DeleteAnnouncementComponent } from './dialogs/delete-announcement/delete-announcement.component';
import { ViewAnnouncementComponent } from './dialogs/view-announcement/view-announcement.component';
import { VerifyAnnouncementComponent } from './dialogs/verify-announcement/verify-announcement.component';
import { PartiallyVerifiedComponent } from './partially-verified/partially-verified.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { DeletedAnnouncementsComponent } from './deleted-announcements/deleted-announcements.component';
import { PostedAnnouncementsComponent } from './approved-announcements/approval-status/posted-announcements/posted-announcements.component';
import { NotPostedAnnouncementsComponent } from './approved-announcements/approval-status/not-posted-announcements/not-posted-announcements.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PostAnnouncementComponent } from './dialogs/post-announcement/post-announcement.component';

import { CdkColumnDef } from '@angular/cdk/table';


@NgModule({
  declarations: [
    PendingAnnouncementsComponent,
    RejectedAnnouncementsComponent,
    ApprovedAnnouncementsComponent,
    AddAnnouncementsComponent,
    DeleteAnnouncementComponent,
    ViewAnnouncementComponent,
    VerifyAnnouncementComponent,
    PartiallyVerifiedComponent,
    UpdateAnnouncementComponent,
    DeletedAnnouncementsComponent,
    PostedAnnouncementsComponent,
    NotPostedAnnouncementsComponent,
    PostAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnounceRoutingModule,
    DashboardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTabsModule
  ],
  providers:[CdkColumnDef],
})
export class AnnounceModule { }
