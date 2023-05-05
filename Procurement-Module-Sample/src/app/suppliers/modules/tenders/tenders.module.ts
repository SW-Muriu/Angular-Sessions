import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AllPostedTendersComponent } from './all-posted-open-tenders/all-posted-tenders.component';
import { ApplyTenderComponent } from './dialogs/apply-tender/apply-tender.component';
import { EditTenderApplicationComponent } from './dialogs/edit-tender-application/edit-tender-application.component';
import { TendersRoutingModule } from './tenders-routing.module';
import { FilesService } from '../../data/fileconversion/files.service';

import { MatStepperModule } from "@angular/material/stepper";
import { AllPostedClosedTendersComponent } from './all-posted-closed-tenders/all-posted-closed-tenders.component';
import { PayBidfeeComponent } from './dialogs/pay-bidfee/pay-bidfee.component';
import { SuppliersModule } from '../../suppliers.module';


@NgModule({
  declarations: [
    AllPostedTendersComponent,
    ApplyTenderComponent,
    EditTenderApplicationComponent,
    AllPostedClosedTendersComponent,
    PayBidfeeComponent,
    
  ],
  imports: [
    CommonModule,
    TendersRoutingModule,

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
    PerfectScrollbarModule,
    MatStepperModule,

    SuppliersModule

  ],
  providers: [FilesService],
})
export class TendersModule { }
