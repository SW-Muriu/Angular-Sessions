import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermsAndConditionsComponent } from "./components/terms-and-conditions/terms-and-conditions.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { TendersLookupComponent } from './components/tenders-lookup/tenders-lookup.component';

@NgModule({
  declarations: [TermsAndConditionsComponent, TendersLookupComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    PerfectScrollbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class LookupsModule {}
