import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RfqsRoutingModule } from "./rfqs-routing.module";
import { PendingRfqsComponent } from "./pages/all/pending-rfqs/pending-rfqs.component";
import { ApprovedRfqsComponent } from "./pages/all/approved-rfqs/approved-rfqs.component";
import { RejectedRfqsComponent } from "./pages/all/rejected-rfqs/rejected-rfqs.component";
import { VerifyRfqsComponent } from "./pages/dialogs/verify-rfqs/verify-rfqs.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatTableModule } from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DashboardModule } from "../dashboard/dashboard.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { CreateRfqComponent } from "./pages/all/create-rfq/create-rfq.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PostRfqComponent } from "./pages/dialogs/post-rfq/post-rfq.component";
import { MatCardModule } from "@angular/material/card";
import { PostedRfqsComponent } from './pages/all/posted-rfqs/posted-rfqs.component';
import { WidgetsModule } from "src/app/commons/modules/widgets/widgets.module";


@NgModule({
  declarations: [
    PendingRfqsComponent,
    ApprovedRfqsComponent,
    RejectedRfqsComponent,
    VerifyRfqsComponent,
    CreateRfqComponent,
    PostRfqComponent,
    PostedRfqsComponent,
  ],
  imports: [
    CommonModule,
    RfqsRoutingModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatTableExporterModule,
    MatPaginatorModule,
    DashboardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    WidgetsModule
  ],
})
export class RfqsModule {}
