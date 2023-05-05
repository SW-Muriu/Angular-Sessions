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

import { SuppliersComponent } from "../../suppliers.component";
import { ReportsService } from "src/app/admin/data/services/reports.service";
import { saveAs } from "file-saver";


@Component({
  selector: "app-supplier-parameters",
  templateUrl: "./supplier-parameters.component.html",
  styleUrls: ["./supplier-parameters.component.sass"],
})
export class SupplierParametersComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;
  statusForm: FormGroup;
  status: boolean = false;
  deliverablesForm: FormGroup;
  deliverables: boolean = false;
  bankForm: FormGroup;
  bank: boolean = false;

  statuses = [{ name: "Pending" }, { name: "Approved" }, { name: "Rejected" }];
  types = [{ name: "PDF" }, { name: "CSV" }];
  deliverabless = [{ name: "Goods" }, { name: "Service" }];
  category: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
 

  constructor(
    public dialogRef: MatDialogRef<SuppliersComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private snackbar: SnackbarService, 
  ) {}

  ngOnInit(): void {
    if (this.data.test == "general") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "status") {
      this.title = this.data.test;
      this.status = true;
      this.statusForm = this.createStatusForm();
    } else if (this.data.test == "deliverables") {
      this.title = this.data.test;
      this.deliverables = true;
      this.deliverablesForm = this.createDeliverablesForm();
    } else if (this.data.test == "bank") {
      this.title = this.data.test;
      this.bank = true;
      this.bankForm = this.createBankForm();
    }

    console.log("params = ", this.data.test);
  }

  formControl = new FormControl("", [Validators.required]);

  createGeneralForm(): FormGroup {
    return this.fb.group({
      type: ["", Validators.required],
      status: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  createStatusForm(): FormGroup {
    return this.fb.group({
      type: ["", Validators.required],
      status: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  createDeliverablesForm(): FormGroup {
    return this.fb.group({
      deliverable: ["", Validators.required],
      type: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }
  createBankForm(): FormGroup {
    return this.fb.group({
      bank: ["", Validators.required],
      type: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
    });
  }

  generateGeneralReport() {
    this.loading = true;

    let status = this.generalForm.value.status;
    let type = this.generalForm.value.type;
    let fromDate = this.datepipe.transform(
      this.generalForm.value.fromDate,
      "dd/MM/yyyy"
    );
    let toDate = this.datepipe.transform(
      this.generalForm.value.toDate,
      "dd/MM/yyyy"
    );

    const params = new HttpParams()
      .set("status", status)
      .set("format", type)
      .set("from", fromDate)
      .set("to", toDate);

    if (type == "PDF") {
    } else if (type == "CSV") {
    } else {
      this.snackbar.showNotification("snackbar-danger", "Invalid file type!");
    }
  }

  generateStatusReport() {
    this.loading = true;
    let type = this.statusForm.value.type;
    let status = this.statusForm.value.status;
    let fromDate = this.datepipe.transform(
      this.statusForm.value.fromDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    let toDate = this.datepipe.transform(
      this.statusForm.value.toDate,
      'yyyy-MM-ddTHH:mm:ss'
    );

    const params = new HttpParams()

      .set("status", status)
      // .set("format", type)
      .set("fromDate", fromDate)
      .set("toDate", toDate);

    if (type == "PDF") {
      this.subscription = this.reportsService
        .generateStatusPdfReport(params)
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
        .generateStatusExcelReport(params)
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


  

}
