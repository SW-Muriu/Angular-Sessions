import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApprovedNeedsComponent } from './all/approved-needs/approved-needs.component';
import { ApprovedTendersComponent } from './all/approved-tenders/approved-tenders.component';
import { ClosedTendersComponent } from './all/closed-tenders/closed-tenders.component';
import { PendingTendersComponent } from './all/pending-tenders/pending-tenders.component';
import { PostedTendersComponent } from './all/posted-tenders/posted-tenders.component';
import { PrepareTenderComponent } from './all/prepare-tender/prepare-tender.component';
import { RejectedTendersComponent } from './all/rejected-tenders/rejected-tenders.component';
import { TenderCategoriesComponent } from './all/tender-categories/tender-categories.component';
import { UpdateTenderComponent } from './all/update-tender/update-tender.component';
import { AllTenderAdvertsComponent } from './tender-advert-management/all-tender-adverts/all-tender-adverts.component';
import { ApprovedTenderAdvertsComponent } from './tender-advert-management/approved-tender-adverts/approved-tender-adverts.component';
import { GenerateTenderAdvertComponent } from './tender-advert-management/generate-tender-advert/generate-tender-advert.component';
import { PendingTenderAdvertsComponent } from './tender-advert-management/pending-tender-adverts/pending-tender-adverts.component';
import { RejectedTenderAdvertsComponent } from './tender-advert-management/rejected-tender-adverts/rejected-tender-adverts.component';
import { UpdateTebderAdvertComponent } from './tender-advert-management/update-tebder-advert/update-tebder-advert.component';

const routes: Routes = [
  { path: "tender-categories", component: TenderCategoriesComponent },
  { path: "approved-needs", component: ApprovedNeedsComponent },
  { path: "prepare-tender", component: PrepareTenderComponent },
  { path: "pending-tenders", component: PendingTendersComponent },
  { path: "approved-tenders", component: ApprovedTendersComponent },
  { path: "posted-tenders", component: PostedTendersComponent },
  { path: "closed-tenders", component: ClosedTendersComponent },
  { path: "rejected-tenders", component: RejectedTendersComponent },
  { path: "update-tender/:id", component: UpdateTenderComponent },
  { path: "generate-tender-advert", component: GenerateTenderAdvertComponent },
  { path: "all-tender-adverts", component: AllTenderAdvertsComponent },
  { path: "pending-tender-adverts", component: PendingTenderAdvertsComponent },
  { path: "approved-tender-adverts", component: ApprovedTenderAdvertsComponent },
  { path: "rejected-tender-adverts", component: RejectedTenderAdvertsComponent },
  { path: "update-tender-advert/:id", component: UpdateTebderAdvertComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
