import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { TenderRoutingModule } from "./tender-routing.module";
import { AddTenderComponent } from "./dialog/add-tender/add-tender.component";
import { EditTenderComponent } from "./dialog/edit-tender/edit-tender.component";
import { DeleteTenderComponent } from "./dialog/delete-tender/delete-tender.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatTableExporterModule } from "mat-table-exporter";
import { ColorPickerModule } from "ngx-color-picker";
import { NgxMaskModule } from "ngx-mask";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardModule } from "../dashboard/dashboard.module";
import { PrepareTenderComponent } from "./all/prepare-tender/prepare-tender.component";
import { ApprovedNeedsComponent } from "./all/approved-needs/approved-needs.component";
import { ApprovedTendersComponent } from "./all/approved-tenders/approved-tenders.component";
import { PostedTendersComponent } from "./all/posted-tenders/posted-tenders.component";
import { ClosedTendersComponent } from "./all/closed-tenders/closed-tenders.component";
import { PendingTendersComponent } from "./all/pending-tenders/pending-tenders.component";
import { RejectedTendersComponent } from "./all/rejected-tenders/rejected-tenders.component";
import { TenderDetailsComponent } from "./dialog/tender-details/tender-details.component";
import { VerifyTenderComponent } from "./dialog/verify-tender/verify-tender.component";
import { UpdateTenderComponent } from "./all/update-tender/update-tender.component";
import { PostTenderComponent } from "./dialog/post-tender/post-tender.component";
import { LookupsModule } from "src/app/commons/modules/lookups/lookups.module";
import { AllTenderAdvertsComponent } from "./tender-advert-management/all-tender-adverts/all-tender-adverts.component";
import { UpdateTebderAdvertComponent } from "./tender-advert-management/update-tebder-advert/update-tebder-advert.component";
import { DeleteTenderAdvertComponent } from "./dialog/delete-tender-advert/delete-tender-advert.component";
import { VerifyTenderAdvertComponent } from "./dialog/verify-tender-advert/verify-tender-advert.component";
import { GenerateTenderAdvertComponent } from "./tender-advert-management/generate-tender-advert/generate-tender-advert.component";
import { TenderAdvertDetailsComponent } from "./dialog/tender-advert-details/tender-advert-details.component";
import { RejectedTenderAdvertsComponent } from "./tender-advert-management/rejected-tender-adverts/rejected-tender-adverts.component";
import { PendingTenderAdvertsComponent } from "./tender-advert-management/pending-tender-adverts/pending-tender-adverts.component";
import { ApprovedTenderAdvertsComponent } from "./tender-advert-management/approved-tender-adverts/approved-tender-adverts.component";
import { PostTenderAdvertComponent } from "./dialog/post-tender-advert/post-tender-advert.component";
import { PrequalifiedVendorDetailsComponent } from "./dialog/prequalified-vendor-details/prequalified-vendor-details.component";
import { TenderCategoriesComponent } from "./all/tender-categories/tender-categories.component";
import { TenderMandatoryRequirementsComponent } from "./dialog/tender-mandatory-requirements/tender-mandatory-requirements.component";
import { TenderTechnicalRequirementsComponent } from "./dialog/tender-technical-requirements/tender-technical-requirements.component";
import { TenderFinancialRequirementsComponent } from "./dialog/tender-financial-requirements/tender-financial-requirements.component";
import { FilesService } from "src/app/suppliers/data/fileconversion/files.service";
import { WidgetsModule } from "src/app/commons/modules/widgets/widgets.module";

@NgModule({
  declarations: [
    AddTenderComponent,
    EditTenderComponent,
    DeleteTenderComponent,
    PrepareTenderComponent,
    ApprovedNeedsComponent,
    ApprovedTendersComponent,
    PostedTendersComponent,
    ClosedTendersComponent,
    PendingTendersComponent,
    RejectedTendersComponent,
    TenderDetailsComponent,
    VerifyTenderComponent,
    UpdateTenderComponent,
    PostTenderComponent,
    AllTenderAdvertsComponent,
    UpdateTebderAdvertComponent,
    DeleteTenderAdvertComponent,
    VerifyTenderAdvertComponent,
    GenerateTenderAdvertComponent,
    TenderAdvertDetailsComponent,
    RejectedTenderAdvertsComponent,
    PendingTenderAdvertsComponent,
    ApprovedTenderAdvertsComponent,
    PostTenderAdvertComponent,
    PrequalifiedVendorDetailsComponent,
    TenderCategoriesComponent,
    TenderMandatoryRequirementsComponent,
    TenderTechnicalRequirementsComponent,
    TenderFinancialRequirementsComponent,
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSortModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMaskModule,
    ColorPickerModule,
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    PerfectScrollbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    SharedModule,
    DashboardModule,
    LookupsModule,
    MatProgressSpinnerModule,
    WidgetsModule
  ],
  providers: [FilesService, DatePipe],
})
export class TenderModule {}
