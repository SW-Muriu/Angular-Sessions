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

@Component({
  selector: "app-payment-params",
  templateUrl: "./payment-params.component.html",
  styleUrls: ["./payment-params.component.sass"],
})
export class PaymentParamsComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  supplierPaymentForm: FormGroup;
  supplierPayment: boolean = false;

  supplierStatementForm: FormGroup;
  supplierStatement: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  paymentRecievedForm: FormGroup;
  paymentRecieved: boolean = false;
  
  posPerSupplierForm: FormGroup;
  posPerSupplier: boolean = false;

  classes = [
    { name: "Payments to suppliers" },
    // { name: "Supplier statement" },
    //{ name: "Payments from customers" },
    { name: "Ageing report" },
    { name: "Payments by status" },
  ];
  types = [{ name: "PDF" }, { name: "CSV" }];

  vatTypes = [{ name: "VAT withholding" }, { name: "Income withholding" }];

  statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];

  category: any;
  customers: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
  supplierss: any;

  activateStatus: boolean = false;

  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<PaymentParamsComponent>,
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
    } else if (this.data.test == "supplier payment") {
      this.getSuppliers();
      this.title = this.data.test;
      this.supplierPayment = true;
      this.supplierPaymentForm = this.createSupplierPaymentForm();
    } else if (this.data.test == "supplier statement") {
      this.getSuppliers();
      this.title = this.data.test;
      this.supplierStatement = true;
      this.supplierStatementForm = this.createSupplierStatementForm();
    } else if (this.data.test == "payments recieved") {
      this.getCustomers();
      this.title = this.data.test;
      this.paymentRecieved = true;
      this.paymentRecievedForm = this.createPaymentRecievedForm();
    }else if (this.data.test == "POs per supplier") {
      this.getSuppliers();
      this.title = this.data.test;
      this.posPerSupplier = true;
      this.posPerSupplierForm = this.createPosPerSupplierForm();
    }
    console.log("params = ", this.data.test);
  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
      type: ["PDF"],
      class: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["Pending"],
    });
  }

  createSupplierPaymentForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  createSupplierStatementForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      type: ["PDF"],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }

  createPaymentRecievedForm(): FormGroup {
    return this.fb.group({
      customer: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
    });
  }
  createPosPerSupplierForm(): FormGroup {
    return this.fb.group({
      supplier: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      type: ["PDF"],
    });
  }

  generateSupplierPaymentsReport() {
    this.loading = true;
    let type = this.supplierPaymentForm.value.type;
    let supplier = this.supplierPaymentForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.supplierPaymentForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.supplierPaymentForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()

      // .set("format", type)
      .set("supplier_id", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generatePaymentsDonePdfReport(params)
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
        .generatePaymentsDoneExcelReport(params)
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

  generateSupplierStatementReport() {
    this.loading = true;
    let type = this.supplierStatementForm.value.type;
    let supplier = this.supplierStatementForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.supplierStatementForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.supplierStatementForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()

      .set("supplier_id", supplier)
      // .set("format", type)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateSupplierStatementPdfReport(params)
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
        .generateSupplierStatementExcelReport(params)
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

  generatePaymentRecievedReport() {
    this.loading = true;
    let type = this.paymentRecievedForm.value.type;
    let customer = this.paymentRecievedForm.value.customer;
    let fromDate = this.datepipe.transform(
      this.paymentRecievedForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.paymentRecievedForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("customer", customer)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generatePaymentRecievedPdfReport(params)
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
  }

  generatePosPerSupplierReport() {
    this.loading = true;
    let type = this.posPerSupplierForm.value.type;
    let supplier = this.posPerSupplierForm.value.supplier;
    let fromDate = this.datepipe.transform(
      this.posPerSupplierForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.posPerSupplierForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );

    const params = new HttpParams()
      // .set("format", type)
      .set("supplierId", supplier)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generatePaymentRecievedPdfReport(params)
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
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getStatus(event: any) {
    console.log("val: ", event.value);
    if (event.value == "Payments by status") {
      this.activateStatus = true;
    }else{
      this.activateStatus = false;
    }
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

  generateGeneralReport() {
    this.loading = true;
    let type = this.generalForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalForm.value.fromDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.generalForm.value.toDate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let status = this.generalForm.value.status;

    const params = new HttpParams()
      // .set("format", type)

      .set("status", status)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    //   { name: "Payments to suppliers" },
    // { name: "Supplier statement" },
    // { name: "Payments from customers" },

    if (this.generalForm.value.class == "Payments to suppliers") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralPaymentsToPdfReport(params)
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
          .generateGeneralPaymentsToExcelReport(params)
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
    } else if (this.generalForm.value.class == "Supplier statement") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralStatementsPdfReport(params)
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
          .generateGeneralStatementsExcelReport(params)
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
    } else if (this.generalForm.value.class == "Payments from customers") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralPaymentsFromPdfReport(params)
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
          .generateGeneralPaymentsFromExcelReport(params)
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
    } else if (this.generalForm.value.class == "Ageing report") {
      if (type == "PDF") {
        this.subscription = this.reportsService
          .generateGeneralAgeingPdfReport(params)
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
          .generateGeneralAgeingExcelReport(params)
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
    } else if (this.generalForm.value.class == "Payments by status") {
      if (type == "PDF") {
        //
        this.subscription = this.reportsService
          .generateGeneralPaymentStatusPdfReport(params)
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
          .generateGeneralAgeingExcelReport(params)
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
