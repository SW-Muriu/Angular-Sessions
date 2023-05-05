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
import { interval, Subject, Subscription, takeUntil, takeWhile } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PaymentService } from "src/app/suppliers/data/services/payment.service";
import { JobsComponent } from "../../jobs/jobs.component";

@Component({
  selector: "app-pay-prequalification-bidfee",
  templateUrl: "./pay-prequalification-bidfee.component.html",
  styleUrls: ["./pay-prequalification-bidfee.component.sass"],
})
export class PayPrequalificationBidfeeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  mpesaForm!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  isMpesaLoading: boolean = false;

  currentUserId: number;
  callBackRecieved: boolean = false;
  paymentMade: boolean = false;

  intervalID: any;
  counter = 0;
  seconds = 5;

  sub: any;
  mySubscription!: Subscription;
  destroy$: Subject<boolean> = new Subject<boolean>();

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
    this.mpesaForm = this.createMpesaForm();
    this.dialogTitle = "Select Mode of Payment";
  }
  ngOnDestroy() {
    //clearInterval(this.intervalID);

    //this.destroy$.next(true); this.destroy$.complete();

    clearInterval(this.intervalID);

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createMpesaForm(): FormGroup {
    return this.fb.group({
      bidamount: [this.Data.bidfee, Validators.required],
      phonenumber: ["", Validators.required],
      billreference: ["Post Bank Uganda", Validators.required],
      prequalificationno: [this.Data.referenceid, Validators.required],
    });
  }

  submit() {
    console.log("mpesaForm = ", this.mpesaForm.value);
    this.isMpesaLoading = true;
    this.paymentMade = true;

    const params = new HttpParams()
      .set("bidamount", this.mpesaForm.value.bidamount)
      .set("phonenumber", this.mpesaForm.value.phonenumber)
      .set("billreference", this.mpesaForm.value.billreference)
      .set("prequalificationno", this.mpesaForm.value.prequalificationno)
      .set("supplierid", this.currentUserId);

    this.paymentService.mpesaPrequalificationPayement(params).subscribe(
      (res) => {
        if (res.message) {
          console.log("Res.message = ", res.message);
          this._snackBar.open(
            "MPESA RESPONSE: " +
            res.message +
            ". Please enter Mpesa pin in the STK sent to +" +
            this.mpesaForm.value.phonenumber,
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
      .set("prequalificationid", this.mpesaForm.value.prequalificationno)
      .set("supplierid", this.currentUserId);
    this.paymentService.prequalificationPayementStatus(params).subscribe(
      (result) => {
        console.log("confirmPaymentStatus = ", result);
        console.log("this.counter = ", this.counter);
        if (result.status == "Paid") {
          clearInterval(this.intervalID);
          clearTimeout(this.intervalID);
          this.callBackRecieved = true;
          this.isMpesaLoading = false;

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
          if (this.counter === 20) {
            clearInterval(this.intervalID);
          clearTimeout(this.intervalID);
          this.callBackRecieved = true;
          this.isMpesaLoading = false;

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
        if (this.counter === 20) {
          clearInterval(this.intervalID);
          clearTimeout(this.intervalID);
          this.callBackRecieved = true;
          this.isMpesaLoading = false;

          this.dialogRef.close();
          this.snackbar.showNotification('snackbar-danger','Transaction took too long to process. Please try again!!')
        }
      }
    );
  }

  confirmPaymentStatus() {
    const params = new HttpParams()
      .set("prequalificationid", this.mpesaForm.value.prequalificationno)
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
