import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfqsRoutingModule } from './rfqs-routing.module';
import { PendingRfqsComponent } from './pages/all/pending-rfqs/pending-rfqs.component';
import { ApprovedRfqsComponent } from './pages/all/approved-rfqs/approved-rfqs.component';
import { RejectedRfqsComponent } from './pages/all/rejected-rfqs/rejected-rfqs.component';
import { OpenRfqsComponent } from './pages/all/open-rfqs/open-rfqs.component';
import { ClosedRfqsComponent } from './pages/all/closed-rfqs/closed-rfqs.component';
import { RfqDetailsComponent } from './pages/dialogs/rfq-details/rfq-details.component';
import { UpdateRfqComponent } from './pages/dialogs/update-rfq/update-rfq.component';
import { DeleteRfqComponent } from './pages/dialogs/delete-rfq/delete-rfq.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyRfqsComponent } from './pages/dialogs/verify-rfqs/verify-rfqs.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WidgetsModule } from 'src/app/commons/modules/widgets/widgets.module';
import { PendingRfqApplicationsComponent } from './pages/rfq-applications/pending-rfq-applications/pending-rfq-applications.component';
import { RfqsComponent } from './pages/rfq-applications/rfqs/rfqs.component';
import { VerifyRfqApplicationComponent } from './pages/dialogs/verify-rfq-application/verify-rfq-application.component';


@NgModule({
  declarations: [
    PendingRfqsComponent,
    ApprovedRfqsComponent,
    RejectedRfqsComponent,
    OpenRfqsComponent,
    ClosedRfqsComponent, 
    RfqDetailsComponent,
    UpdateRfqComponent,
    DeleteRfqComponent,
    VerifyRfqsComponent,
    PendingRfqApplicationsComponent,
    RfqsComponent,
    VerifyRfqApplicationComponent,
  ],
  imports: [
    CommonModule,
    RfqsRoutingModule,
    SharedModule,
    ComponentsModule,
    MatPaginatorModule,
    MatTableModule,
    DashboardModule,
    MatTableExporterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    WidgetsModule
  ]
})
export class RfqsModule { }
