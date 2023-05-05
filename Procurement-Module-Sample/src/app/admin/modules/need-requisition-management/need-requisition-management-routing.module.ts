import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestNeedComponent } from './pages/request-need/request-need.component';

const routes: Routes = [
  { path: "request-need", component: RequestNeedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedRequisitionManagementRoutingModule { }
