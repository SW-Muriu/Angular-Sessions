import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TenderService } from "src/app/procurement-admin/data/services/tenders.service";
import { TermsService } from "src/app/procurement-admin/data/services/terms.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AllComponent } from "../../all/all.component";

@Component({
  selector: 'app-edit-terms',
  templateUrl: './edit-terms.component.html',
  styleUrls: ['./edit-terms.component.sass']
})
export class EditTermsComponent implements OnInit {

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
    public dialogRef: MatDialogRef<AllComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {

    console.log("test: ", this.Data);
    this.Form = this.createForm();
    this.dialogTitle = "Edit Terms and Conditions";
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: [this.Data.description, Validators.required],
      subTitle: [this.Data.subTitle, Validators.required],
      title: [this.Data.title, Validators.required],
      id: [this.Data.id],
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
            "Tender updated successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-danger",
            "Tender update failure!"
          );
        }
      );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void { }
}
