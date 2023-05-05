import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeedWigetsComponent } from './pages/need-wigets/need-wigets.component';
import { RfqWidgetsComponent } from './pages/rfq-widgets/rfq-widgets.component';
import { TenderWidgetsComponent } from './pages/tender-widgets/tender-widgets.component';
import { RfqApplicationsWidgetsComponent } from './pages/rfq-applications-widgets/rfq-applications-widgets.component';



@NgModule({
  declarations: [
    NeedWigetsComponent,
    RfqWidgetsComponent,
    TenderWidgetsComponent,
    RfqApplicationsWidgetsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NeedWigetsComponent,
    RfqWidgetsComponent,
    TenderWidgetsComponent,
    RfqApplicationsWidgetsComponent
  ]
})
export class WidgetsModule { }
