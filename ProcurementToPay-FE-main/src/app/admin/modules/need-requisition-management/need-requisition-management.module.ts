import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedRequisitionManagementRoutingModule } from './need-requisition-management-routing.module';
import { RequestNeedComponent } from './pages/request-need/request-need.component';


@NgModule({
  declarations: [
    RequestNeedComponent
  ],
  imports: [
    CommonModule,
    NeedRequisitionManagementRoutingModule
  ]
})
export class NeedRequisitionManagementModule { }
