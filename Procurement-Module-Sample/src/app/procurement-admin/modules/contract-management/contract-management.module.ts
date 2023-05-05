import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractManagementRoutingModule } from './contract-management-routing.module';
import { AddContractComponent } from './add-contract/add-contract.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FilesService } from 'src/app/suppliers/data/fileconversion/files.service';
import { ContractSuppliersLookupComponent } from './dialogs/contract-suppliers-lookup/contract-suppliers-lookup.component';
import { MatCardModule } from '@angular/material/card';
import { TendersLookUpComponent } from './dialogs/tenders-look-up/tenders-look-up.component';
import { TermsLookUpComponent } from './dialogs/terms-look-up/terms-look-up.component';
import { PendingContractsComponent } from './pending-contracts/pending-contracts.component';
import { EditContractComponent } from './dialogs/edit-contract/edit-contract.component';
import { ViewContractDetailsComponent } from './dialogs/view-contract-details/view-contract-details.component';
import { RejectedContractsComponent } from './rejected-contracts/rejected-contracts.component';
import { ApprovedContractsComponent } from './approved-contracts/approved-contracts.component';
import { DeletedContractsComponent } from './deleted-contracts/deleted-contracts.component';
import { VerifyContractComponent } from './dialogs/verify-contract/verify-contract.component';


@NgModule({
  declarations: [
    AddContractComponent,
    ContractSuppliersLookupComponent,
    TendersLookUpComponent,
    ContractSuppliersLookupComponent,
    TermsLookUpComponent,
    PendingContractsComponent,
    EditContractComponent,
    ViewContractDetailsComponent,
    ApprovedContractsComponent,
    RejectedContractsComponent,
    DeletedContractsComponent,
    VerifyContractComponent
  ],
  imports: [
    CommonModule,
    ContractManagementRoutingModule,

    DashboardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,

    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    DragDropModule,
    MatChipsModule,
    MatTabsModule,
    CKEditorModule,

    PerfectScrollbarModule,
    MatCardModule
  ],
  providers: [FilesService],
})
export class ContractManagementModule { }
