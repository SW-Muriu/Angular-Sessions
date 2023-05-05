import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';


import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableExporterModule } from "mat-table-exporter";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TenderCategoriesLookUpComponent } from '../../lookups/tender-categories-look-up/tender-categories-look-up.component';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    WidgetsComponent,
    DashboardAnalyticsComponent,
    TenderCategoriesLookUpComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatRadioModule,
    ComponentsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    SharedModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [WidgetsComponent,TenderCategoriesLookUpComponent]
})
export class DashboardModule { }
