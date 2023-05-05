import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription, takeUntil } from "rxjs";

import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import { ReportsService } from "src/app/admin/data/services/reports.service";
import { saveAs } from "file-saver";

import { SupplierService } from "src/app/user/data/services/supplier.service";
import { CustomerService } from "src/app/user/data/services/customer/customer.service";
import { VatWithholdingReportsComponent } from "../../vat-withholding-reports.component";

@Component({
  selector: 'app-vat-params',
  templateUrl: './vat-params.component.html',
  styleUrls: ['./vat-params.component.sass']
})
export class VatParamsComponent implements OnInit {

  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  vatPaidForm: FormGroup;
  vatPaid: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  vatRecievedForm: FormGroup;
  vatRecieved: boolean = false;

  classes = [{ name: "Vat paid" }, { name: "Vat recieved" }];
  types = [{ name: "PDF" }, { name: "CSV" }];

  vatTypes = [{ name: "VAT withholding" }, { name: "Income withholding" }];

  category: any;
  customers: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
  supplierss: any;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<VatWithholdingReportsComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    if (this.data.test == "general") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "vat paid") {
      this.getSuppliers();
      this.title = this.data.test;
      this.vatPaid = true;
      this.vatPaidForm = this.createvatPaidForm();
    } else if (this.data.test == "vat recieved") {
      this.getCustomers();
      this.title = this.data.test;
      this.vatRecieved = true;
      this.vatRecievedForm = this.createvatRecievedForm();
    }
    console.log("params = ", this.data.test);
  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
     type: ["PDF"],
      class: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  
  createvatPaidForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
     type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }

  createvatRecievedForm(): FormGroup {
    return this.fb.group({
      customer: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
     type: ["PDF"],
    });
  }


  generatevatPaidReport() {
    this.loading = true;
    let type = this.vatPaidForm.value.type;
    let supplier = this.vatPaidForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.vatPaidForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.vatPaidForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()

      .set("supplier_id", supplier)
      // .set("format", type)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateVatPaidPdfReport(params)
        .subscribe(
          (response) => {
            let url = window.URL.createObjectURL(response.data);

            // if you want to open PDF in new tab
            window.open(url);

            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("target", "blank");
            a.href = url;
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully"
            );
          }
        );
    } else if (type == "CSV") {
      this.subscription = this.reportsService
        .generateVatPaidPdfReport(params)
        .subscribe(
          (buffer) => {
            const data: Blob = new Blob([buffer], {
              type: "text/csv;charset=utf-8",
            });
            // you may improve this code to customize the name
            // of the export based on date or some other factors
            saveAs(data, "Department.csv");
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "File could not be generated successfully"
            );
          }
        );
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }

  generatevatRecievedReport() {
    this.loading = true;
    let type = this.vatRecievedForm.value.type;
    let customer = this.vatRecievedForm.value.customer;
    let fromDate = this.datepipe.transform(
      this.vatRecievedForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.vatRecievedForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("customer", customer)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateVatRecievedPdfReport(params)
        .subscribe(
          (response) => {
            let url = window.URL.createObjectURL(response.data);

            // if you want to open PDF in new tab
            window.open(url);

            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("target", "blank");
            a.href = url;
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully"
            );
          }
        );
    } else if (type == "CSV") {
      this.subscription = this.reportsService
        .generateVatRecievedExcelReport(params)
        .subscribe(
          (buffer) => {
            const data: Blob = new Blob([buffer], {
              type: "text/csv;charset=utf-8",
            });
            // you may improve this code to customize the name
            // of the export based on date or some other factors
            saveAs(data, "Department.csv");
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully"
            );
          },
          (err) => {
            this.error = err;
            this.loading = false;

            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-danger",
              "File could not be generated successfully"
            );
          }
        );
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.supplierss = res;
        //console.log(this.supplierss);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCustomers() {
    this.customerService.getAllCustomers().subscribe((res) => {
      this.customers = res;
      console.log("Cust: ", this.customers);
    }),
      (err) => {
        console.log(err);
      };
  }


  generateGeneralVatReport() {
    this.loading = true;
    let type = this.generalForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalForm.value.fromDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    let toDate = this.datepipe.transform(
      this.generalForm.value.toDate,
      'yyyy-MM-ddTHH:mm:ss'
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("fromDate", fromDate)
      .set("toDate", toDate);
 
if(this.generalForm.value.class=='Vat paid'){
  if (type == "PDF") {
    this.subscription = this.reportsService
      .generateGeneralVatPaidPdfReport(params)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
        },
        (err) => {
          this.error = err;
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully"
          );
        }
      );
  } else if (type == "CSV") {
    this.subscription = this.reportsService
      .generateVatWithExcelReport(params)
      .subscribe(
        (buffer) => {
          const data: Blob = new Blob([buffer], {
            type: "text/csv;charset=utf-8",
          });
          // you may improve this code to customize the name
          // of the export based on date or some other factors
          saveAs(data, "Department.csv");
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
        },
        (err) => {
          this.error = err;
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-danger",
            "File could not be generated successfully"
          );
        }
      );
  } else {
    this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
  }

}else if(this.generalForm.value.vatType=='Vat recieved'){
  if (type == "PDF") {
    this.subscription = this.reportsService
      .generateGeneralVatRecievedPdfReport(params)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
        },
        (err) => {
          this.error = err;
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully"
          );
        }
      );
  } else if (type == "CSV") {
    this.subscription = this.reportsService
      .generateIncomeWithExcelReport(params)
      .subscribe(
        (buffer) => {
          const data: Blob = new Blob([buffer], {
            type: "text/csv;charset=utf-8",
          });
          // you may improve this code to customize the name
          // of the export based on date or some other factors
          saveAs(data, "Department.csv");
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"
          );
        },
        (err) => {
          this.error = err;
          this.loading = false;

          this.dialogRef.close();

          this.snackbar.showNotification(
            "snackbar-danger",
            "File could not be generated successfully"
          );
        }
      );
  } else {
    this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
  }

}


    
  }
}
