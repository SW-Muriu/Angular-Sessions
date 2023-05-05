import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PaymentService } from "src/app/suppliers/data/services/payment.service";
import { JobsComponent } from "../../jobs/jobs.component";


@Component({
  selector: 'app-paypal-payprequalification-bidfee',
  templateUrl: './paypal-payprequalification-bidfee.component.html',
  styleUrls: ['./paypal-payprequalification-bidfee.component.scss']
})
export class PaypalPayprequalificationBidfeeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  paypalForm!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  isPaypalLoading: boolean = false;

  currentUserId: number;
  callBackRecieved: boolean = false;
  paymentMade: boolean = false;
  showPaypalLink: boolean = false;
  showReciept:  boolean = false;

  paypalLink: any;

  intervalID: any;
  counter = 0;
  seconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenStorageService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<JobsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
  }

  ngOnInit(): void {
    this.currentUserId = this.tokenService.getUser().id;
    //console.log("test: ", this.Data);
    this.paypalForm = this.createpaypalForm();
    this.dialogTitle = "Select Mode of Payment";
  }
  ngOnDestroy() {
    

    clearInterval(this.intervalID);

    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }

  createpaypalForm(): FormGroup {
    return this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      currency: ["USD", Validators.required],
      subtotal: [1, Validators.required],
      total: [this.Data.bidfee, Validators.required],
      tax: [0],
      shipping: [0],
      description: ["-"],
      prequalificationid: [this.Data.referenceid, Validators.required],
      supplierid: [this.currentUserId, Validators.required],
    });
  }

  submit() {
    console.log("paypalForm = ", this.paypalForm.value);
    this.isPaypalLoading = true;
    this.paymentMade = true;

    this.paymentService.paypalPrequalificationPayement(this.paypalForm.value).subscribe(
      (res) => {
        if (res.message) {
          this.paypalLink = res.message;
          this.showPaypalLink = true;

          console.log("paypalLink = ", res.message);
          this._snackBar.open(
            "PAYPAL RESPONSE: " +
            " Please click on the link provided to perform the transaction",
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );

          this.intervalLoop();
        }

        //this.dialogRef.close();
      },
      (err) => {
        console.log("Error ", err);
        this.snackbar.showNotification("snackbar-danger", "Payment failured!");
      }
    );
  }

  intervalLoop() {
    this.intervalID = setInterval(() => {
      this.counter++;
      this.callbackRecived();
    }, this.seconds * 1000);

  }
  callbackRecived() {
    const params = new HttpParams()
      .set("prequalificationid", this.paypalForm.value.prequalificationid)
      .set("supplierid", this.currentUserId);
    this.paymentService.prequalificationPayementStatus(params).subscribe(
      (result) => {
        console.log("confirmPaymentStatus = ", result);
        console.log("this.counter = ", this.counter);
        if (result.status == "Paid") {
          clearInterval(this.intervalID);
          clearTimeout(this.intervalID);
          this.callBackRecieved = true;
          this.isPaypalLoading = false;
          this.showPaypalLink = false;
          this.showReciept = true;

          this._snackBar.open(
            "PAYMENT STATUS: " +
            result.status +
            " PAYMENT MODE: " +
            result.paymentMode +
            " REFERENCE NO: " +
            result.refNo +
            " TRAN AMOUNT: " +
            result.transactionAmount +
            " TRAN DATE: " +
            new Date(result.trandate),
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
        } else if (result.status == "Failed") {
          if (this.counter === 60) {
            clearInterval(this.intervalID);
            clearTimeout(this.intervalID);
            this.callBackRecieved = true;
            this.isPaypalLoading = false;

            this.dialogRef.close();
            this._snackBar.open(
              "PAYMENT STATUS: " +
              result.status +
              " PAYMENT MODE: " +
              result.paymentMode +
              " REFERENCE NO: " +
              result.refNo +
              " TRAN AMOUNT: " +
              result.transactionAmount +
              " TRAN DATE: " +
              new Date(result.trandate),
              "X",
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 50000,
                panelClass: ["snackbar-danger", "snackbar-danger"],
              }
            );
            this.dialogRef.close();
          }
        }
      },
      (err) => {
        console.log(err);
        console.log("this.counter = ", this.counter);
        if (this.counter === 60) {
          clearInterval(this.intervalID);
          clearTimeout(this.intervalID);
          this.callBackRecieved = true;
          this.isPaypalLoading = false;

          this.dialogRef.close();
          this.snackbar.showNotification('snackbar-danger', 'Transaction took too long to process. Please try again!!')
        }
      }
    );
  }

  confirmPaymentStatus() {
    const params = new HttpParams()
      .set("prequalificationid", this.paypalForm.value.prequalificationid)
      .set("supplierid", this.currentUserId); 
    this.paymentService.prequalificationPayementStatus(params).subscribe(
      (result) => {
        console.log("confirmPaymentStatus = ", result);
        if (result.status == "Paid") {
          this._snackBar.open(
            "PAYMENT STATUS: " +
            result.status +
            " PAYMENT MODE: " +
            result.paymentMode +
            " REFERENCE NO: " +
            result.refNo +
            " TRAN AMOUNT: " +
            result.transactionAmount +
            " TRAN DATE: " +
            new Date(result.trandate),
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
          this.tenderDetails(this.Data);
        } else if (result.status == "Failed") {
          this.dialogRef.close();
          this._snackBar.open(
            "PAYMENT STATUS: " +
            result.status +
            " PAYMENT MODE: " +
            result.paymentMode +
            " REFERENCE NO: " +
            result.refNo +
            " TRAN AMOUNT: " +
            result.transactionAmount +
            " TRAN DATE: " +
            new Date(result.trandate),
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-danger", "snackbar-danger"],
            }
          );
        }
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  tenderDetails(data) {
    this.router.navigate(["/suppliers/prequalifications/job-details"], {
      state: {
        preqDetails: JSON.stringify(data),
        action: "Job details",
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    clearInterval(this.intervalID);
    clearTimeout(this.intervalID);
  }
  public confirmAdd(): void { }
}
