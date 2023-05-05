import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnnouncementsComponent } from './add-announcements/add-announcements.component';
import { ApprovedAnnouncementsComponent } from './approved-announcements/approved-announcements.component';
import { DeletedAnnouncementsComponent } from './deleted-announcements/deleted-announcements.component';
import { PartiallyVerifiedComponent } from './partially-verified/partially-verified.component';
import { PendingAnnouncementsComponent } from './pending-announcements/pending-announcements.component';
import { RejectedAnnouncementsComponent } from './rejected-announcements/rejected-announcements.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';

const routes: Routes = [
  { path: "add", component: AddAnnouncementsComponent},
  { path: "update-announcement", component: UpdateAnnouncementComponent},
  { path: "pending", component: PendingAnnouncementsComponent},
  { path: "partially-verified", component: PartiallyVerifiedComponent},
  { path: "approved", component: ApprovedAnnouncementsComponent},
  { path: "rejected", component: RejectedAnnouncementsComponent},
  { path: "deleted-announcements", component: DeletedAnnouncementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnounceRoutingModule { }
