import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsRoutingModule } from "./reports-routing.module";
import { AllComponent } from "./pages/all/all.component";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableExporterModule } from "mat-table-exporter";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardModule } from "../dashboard/dashboard.module";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { PaymentsComponent } from './pages/all-minis/payments/payments.component';
import { VatWithholdingReportsComponent } from './pages/all-minis/vat-withholding-reports/vat-withholding-reports.component';
import { IncomeWithholdingReportsComponent } from './pages/all-minis/income-withholding-reports/income-withholding-reports.component';
import { BillsComponent } from "./pages/before-minis/bills/bills.component";
import { CustomersComponent } from "./pages/before-minis/customers/customers.component";
import { InvoiceComponent } from "./pages/before-minis/invoice/invoice.component";
import { PoParametersComponent } from "./pages/before-minis/purchaseorders/dialog/po-parameters/po-parameters.component";
import { PurchaseordersComponent } from "./pages/before-minis/purchaseorders/purchaseorders.component";
import { SupplierParametersComponent } from "./pages/before-minis/suppliers/dialog/supplier-parameters/supplier-parameters.component";
import { SuppliersComponent } from "./pages/before-minis/suppliers/suppliers.component";
import { TransactionsComponent } from "./pages/before-minis/transactions/transactions.component";
import { PaymentParamsComponent } from './pages/all-minis/payments/dialog/payment-params/payment-params.component';
import { IncomeParamsComponent } from './pages/all-minis/income-withholding-reports/dialog/income-params/income-params.component';
import { VatParamsComponent } from "./pages/all-minis/vat-withholding-reports/dialog/vat-params/vat-params.component";
import { InvoicesComponent } from './pages/all-minis/invoices/invoices.component';
import { InvoiceParamsComponent } from './pages/all-minis/invoices/dialog/invoice-params/invoice-params.component';

@NgModule({
  declarations: [
    AllComponent,
    SuppliersComponent,
    PurchaseordersComponent,
    BillsComponent,
    CustomersComponent,
    InvoiceComponent,
    TransactionsComponent,
    SupplierParametersComponent,
    PoParametersComponent,
    PaymentsComponent,
    VatWithholdingReportsComponent,
    IncomeWithholdingReportsComponent,
    PaymentParamsComponent,
    VatParamsComponent,
    IncomeParamsComponent,
    InvoicesComponent,
    InvoiceParamsComponent,
  
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
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
    MatCheckboxModule,
    MatTabsModule,
    PerfectScrollbarModule
  ],
  providers: [DatePipe]
})
export class ReportsModule {}
