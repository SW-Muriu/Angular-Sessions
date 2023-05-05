import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPrequalifiedComponent } from './all-prequalified/all-prequalified.component';

const routes: Routes = [
  { path: "all-prequalified", component: AllPrequalifiedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrequalifiedSuppliersRoutingModule { }
