import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedTendersComponent } from './all/approved-tenders/approved-tenders.component';
import { ApprovedTenderAdvertsComponent } from './tender-advert-management/approved-tender-adverts/approved-tender-adverts.component';
import { PendingTenderAdvertsComponent } from './tender-advert-management/pending-tender-adverts/pending-tender-adverts.component';
import { RejectedTenderAdvertsComponent } from './tender-advert-management/rejected-tender-adverts/rejected-tender-adverts.component';


const routes: Routes = [
  { path: "approved-tenders", component: ApprovedTendersComponent },
  { path: "pending-tender-adverts", component: PendingTenderAdvertsComponent },
  { path: "approved-tender-adverts", component: ApprovedTenderAdvertsComponent },
  { path: "rejected-tender-adverts", component: RejectedTenderAdvertsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
