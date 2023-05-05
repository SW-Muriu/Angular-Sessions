import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecieveApplicationsRoutingModule } from './recieve-applications-routing.module';
import { PendingApplicationsComponent } from './pending-applications/pending-applications.component';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';
import { RejectedApplicationsComponent } from './rejected-applications/rejected-applications.component';
import { VerifyApplicationComponent } from './dialogs/verify-application/verify-application.component';
import { ViewApplicationComponent } from './dialogs/view-application/view-application.component';
import { DeleteApplicationComponent } from './dialogs/delete-application/delete-application.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CdkColumnDef } from '@angular/cdk/table';

@NgModule({
  declarations: [
    PendingApplicationsComponent,
    ApprovedApplicationsComponent,
    RejectedApplicationsComponent,
    VerifyApplicationComponent,
    ViewApplicationComponent,
    DeleteApplicationComponent
  ],
  imports: [
    CommonModule,
    RecieveApplicationsRoutingModule,
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
    DashboardModule,

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

    NgxPaginationModule,
    PerfectScrollbarModule
  ],
  providers:[CdkColumnDef],
})
export class RecieveApplicationsModule { }
