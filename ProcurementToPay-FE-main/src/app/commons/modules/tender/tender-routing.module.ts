import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingTendersComponent } from './all/pending-tenders/pending-tenders.component';
import { ApprovedTenderAdvertsComponent } from './tender-advert-management/approved-tender-adverts/approved-tender-adverts.component';

const routes: Routes = [  
  { path: "pending-tenders", component: PendingTendersComponent },
  { path: "approved-tender-adverts", component: ApprovedTenderAdvertsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
