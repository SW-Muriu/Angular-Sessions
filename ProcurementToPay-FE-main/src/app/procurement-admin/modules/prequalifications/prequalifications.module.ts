import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrequalificationsRoutingModule } from './prequalifications-routing.module';
import { PreqCategoriesComponent } from './preq-categories/preq-categories.component';
import { AddCatComponent } from './preq-categories/dialog/add-cat/add-cat.component';
import { DeleteCatComponent } from './preq-categories/dialog/delete-cat/delete-cat.component';
import { EditCatComponent } from './preq-categories/dialog/edit-cat/edit-cat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    PreqCategoriesComponent,
    AddCatComponent,
    DeleteCatComponent,
    EditCatComponent
  ],
  imports: [
    CommonModule,
    PrequalificationsRoutingModule,
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
    DashboardModule
  ]
})
export class PrequalificationsModule { }
