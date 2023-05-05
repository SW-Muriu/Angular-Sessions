import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NeedRoutingModule } from "./need-routing.module";
import { NeedRequisitionFormComponent } from "./pages/requisition-of-need-management/need-requisition-form/need-requisition-form.component";
import { PendingNeedsComponent } from "./pages/requisition-of-need-management/pending-needs/pending-needs.component";
import { RejectedNeedsComponent } from "./pages/requisition-of-need-management/rejected-needs/rejected-needs.component";
import { ApprovedNeedsComponent } from "./pages/requisition-of-need-management/approved-needs/approved-needs.component";
import { FullfilledNeedsComponent } from "./pages/requisition-of-need-management/fullfilled-needs/fullfilled-needs.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from "@angular/material/paginator";
import { NeedDetailsComponent } from './pages/requisition-of-need-management/need-details/need-details.component';
import { UpdateNeedComponent } from './pages/requisition-of-need-management/update-need/update-need.component';
import { DeleteNeedComponent } from './pages/requisition-of-need-management/dialogs/delete-need/delete-need.component';
import { VerifyNeedComponent } from './pages/requisition-of-need-management/dialogs/verify-need/verify-need.component';
import { DashboardModule } from "../dashboard/dashboard.module";
import { WidgetsModule } from "src/app/commons/modules/widgets/widgets.module";


@NgModule({
  declarations: [
    NeedRequisitionFormComponent,
    PendingNeedsComponent,
    RejectedNeedsComponent,
    ApprovedNeedsComponent,
    FullfilledNeedsComponent,
    NeedDetailsComponent,
    UpdateNeedComponent,
    DeleteNeedComponent,
    VerifyNeedComponent,
  ],
  imports: [
    CommonModule,
    NeedRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTableExporterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressBarModule,
    PerfectScrollbarModule,
    MatMenuModule,
    MatTooltipModule,
    ComponentsModule,
    MatPaginatorModule,
    SharedModule,
    WidgetsModule
  ],
})
export class NeedModule {}
