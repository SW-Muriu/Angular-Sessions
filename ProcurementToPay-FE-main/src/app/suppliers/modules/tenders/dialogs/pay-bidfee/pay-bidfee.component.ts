import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TermsService } from "src/app/procurement-admin/data/services/terms.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AllPostedTendersComponent } from "../../all-posted-open-tenders/all-posted-tenders.component";


@Component({
  selector: 'app-pay-bidfee',
  templateUrl: './pay-bidfee.component.html',
  styleUrls: ['./pay-bidfee.component.scss']
})
export class PayBidfeeComponent implements OnInit {

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  selectFeedback: " ";

  constructor(
    private termsService: TermsService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AllPostedTendersComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
  }

  ngOnInit(): void {

    console.log("test: ", this.Data);
    this.Form = this.createMpesaForm();
    this.dialogTitle = "Select Mode of Payment";
  }

  createMpesaForm(): FormGroup {
    return this.fb.group({
      supplierName: ["", Validators.required],
      mpesaNo: ["", Validators.required],
    });
  }


  submit() {
    console.log("Form contents = ", this.Form.value);
    this.termsService
      .updateTerm(this.Form.value)
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Payment made successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-danger",
            "Payment failure!"
          );
        }
      );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void { }
}
