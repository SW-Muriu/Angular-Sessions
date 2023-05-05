import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrequalificationsRoutingModule } from './prequalifications-routing.module';
import { JobsComponent } from './jobs/jobs.component';
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
import { JobDetailsComponent } from './job-details/job-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from "@angular/material/chips";
import { FilesService } from '../../data/fileconversion/files.service';
import { SafePipe } from '../../data/fileconversion/safe.pipe';
import { MatListModule } from '@angular/material/list';

import { NgxPaginationModule } from 'ngx-pagination';
import { ApplicationsSentComponent } from './applications-sent/applications-sent.component';
import { SuppliersModule } from '../../suppliers.module';
import { PayPrequalificationBidfeeComponent } from './dialogs/pay-prequalification-bidfee/pay-prequalification-bidfee.component';
import { PaypalPayprequalificationBidfeeComponent } from './dialogs/paypal-payprequalification-bidfee/paypal-payprequalification-bidfee.component';
@NgModule({
  declarations: [
    SafePipe,
    JobsComponent,
    JobDetailsComponent,
    ApplicationsSentComponent,
    PayPrequalificationBidfeeComponent,
    PaypalPayprequalificationBidfeeComponent
  ],
  imports: [
    CommonModule,
    PrequalificationsRoutingModule,
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

    MatPaginatorModule,
    MatListModule,

    NgxPaginationModule,
    SuppliersModule
    
  ],
  providers: [FilesService],
})
export class PrequalificationsModule { }
// imports: [BrowserModule, FormsModule],
//   declarations: [SafePipe, AppComponent],
//   bootstrap: [AppComponent],
//   providers: [FilesService],