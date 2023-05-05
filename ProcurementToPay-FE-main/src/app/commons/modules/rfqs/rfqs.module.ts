import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RfqsRoutingModule } from "./rfqs-routing.module";
import { RecieveRfqApplicationsComponent } from "./pages/recieve-rfq-applications/recieve-rfq-applications.component";
import { PendingRfqApplicationsComponent } from "./pages/recieve-rfq-applications/pending-rfq-applications/pending-rfq-applications.component";
import { ApprovedRfqApplicationsComponent } from "./pages/recieve-rfq-applications/approved-rfq-applications/approved-rfq-applications.component";
import { RejectedRfqApplicationsComponent } from "./pages/recieve-rfq-applications/rejected-rfq-applications/rejected-rfq-applications.component";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DashboardModule } from "../dashboard/dashboard.module";
import { MatDialogModule } from "@angular/material/dialog";
import { RfqApplicationsComponent } from "./pages/recieve-rfq-applications/rfq-applications/rfq-applications.component";
import { RfqApplicationDetailsComponent } from './pages/dialogs/rfq-application-details/rfq-application-details.component';
import { VerifyRfqApplicationComponent } from './pages/dialogs/verify-rfq-application/verify-rfq-application.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { WidgetsModule } from "../widgets/widgets.module";
import { RfqApprovedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-approved-applications/rfq-approved-applications.component';
import { RfqRejectedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-rejected-applications/rfq-rejected-applications.component';
import { SystemEvaluatedApplicationsComponent } from './pages/recieve-rfq-applications/system-evaluated-applications/system-evaluated-applications.component';
import { RfqSystemEvaluatedApplicationsComponent } from './pages/recieve-rfq-applications/rfq-system-evaluated-applications/rfq-system-evaluated-applications.component';

@NgModule({
  declarations: [
    RecieveRfqApplicationsComponent,
    PendingRfqApplicationsComponent,
    ApprovedRfqApplicationsComponent,
    RejectedRfqApplicationsComponent,
    RfqApplicationsComponent,
    RfqApplicationDetailsComponent,
    VerifyRfqApplicationComponent,
    RfqApprovedApplicationsComponent,
    RfqRejectedApplicationsComponent,
    SystemEvaluatedApplicationsComponent,
    RfqSystemEvaluatedApplicationsComponent,
  ],
  imports: [
    CommonModule,
    RfqsRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SharedModule,
    ComponentsModule,
    DashboardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    WidgetsModule
  ],
})
export class RfqsModule {}
