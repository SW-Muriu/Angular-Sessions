import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostedTendersComponent } from './all-posted-open-tenders/all-posted-tenders.component';
import { ApplyTenderComponent } from './dialogs/apply-tender/apply-tender.component';

const routes: Routes = [
  { path: "all-posted-tenders", component: AllPostedTendersComponent },
  { path: "view-tender-details", component: ApplyTenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TendersRoutingModule { }
