import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RfqsRoutingModule } from "./rfqs-routing.module";
import { OpenRfqsComponent } from "./pages/all/open-rfqs/open-rfqs.component";
import { PendingRfqApplicationsComponent } from "./pages/all/pending-rfq-applications/pending-rfq-applications.component";
import { ApprovedRfqApplicationComponent } from "./pages/all/approved-rfq-application/approved-rfq-application.component";
import { UnsuccessfulRfqApplicationsComponent } from "./pages/all/unsuccessful-rfq-applications/unsuccessful-rfq-applications.component";
import { RfqBidComponent } from "./pages/dialogs/rfq-bid/rfq-bid.component";
import { RfqBidDetailsComponent } from "./pages/dialogs/rfq-bid-details/rfq-bid-details.component";
import { DeleteRfqComponent } from "./pages/dialogs/delete-rfq/delete-rfq.component";
import { DeleteRfqBidComponent } from "./pages/dialogs/delete-rfq-bid/delete-rfq-bid.component";
import { UpdateRfqBidComponent } from "./pages/dialogs/update-rfq-bid/update-rfq-bid.component";
import { MatTableModule } from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DashboardModule } from "../dashboard/dashboard.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FilesService } from "../../data/fileconversion/files.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SendQuatationComponent } from "./pages/all/send-quatation/send-quatation.component";
import { MatSelectModule } from "@angular/material/select";
import { UpdatePendingQuatationComponent } from "./pages/all/update-pending-quatation/update-pending-quatation.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    OpenRfqsComponent,
    PendingRfqApplicationsComponent,
    ApprovedRfqApplicationComponent,
    UnsuccessfulRfqApplicationsComponent,
    RfqBidComponent,
    RfqBidDetailsComponent,
    DeleteRfqComponent,
    DeleteRfqBidComponent,
    UpdateRfqBidComponent,
    SendQuatationComponent,
    UpdatePendingQuatationComponent,
  ],
  imports: [
    CommonModule,
    RfqsRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatSortModule,
    SharedModule,
    ComponentsModule,
    DashboardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [FilesService],
})
export class RfqsModule {}
