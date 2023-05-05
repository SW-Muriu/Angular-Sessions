import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreqCategoriesComponent } from './preq-categories/preq-categories.component';


const routes: Routes = [
  
  { path: "preq-categories", component: PreqCategoriesComponent},
  // { path: "preq-requirements", component: PreqRequirementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrequalificationsRoutingModule { }
