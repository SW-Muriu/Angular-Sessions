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
  selector: 'app-add-terms',
  templateUrl: './add-terms.component.html',
  styleUrls: ['./add-terms.component.sass']
})
export class AddTermsComponent implements OnInit {

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
    this.Form = this.createForm();
    this.dialogTitle = "Add Terms and Conditions";
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: ["", Validators.required],
    subTitle: ["", Validators.required],
    title: ["", Validators.required],
    
    });
  }


 
  submit() {
    console.log("Form contents = ", this.Form.value.name);
    this.termsService
      .addTerms(this.Form.value)
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Tender added successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-danger",
            "Tender upload failure!"
          );
        }
      );
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {}
}
