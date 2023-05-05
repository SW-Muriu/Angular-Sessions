import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialRequirementsComponent } from './financial-requirements/financial-requirements.component';
import { MandatoryRequirementsComponent } from './mandatory-requirements/mandatory-requirements.component';
import { TechnicalRequirementsComponent } from './technical-requirements/technical-requirements.component';

const routes: Routes = [
  {path:"financial-requirements", component: FinancialRequirementsComponent},
  {path: "mandatory-requirements", component:MandatoryRequirementsComponent},
  {path: "technical-requierements", component: TechnicalRequirementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRequirementsRoutingModule { }
