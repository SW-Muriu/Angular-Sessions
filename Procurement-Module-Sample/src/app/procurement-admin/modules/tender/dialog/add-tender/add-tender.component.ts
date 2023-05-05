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
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderCategoriesComponent } from "../../all/tender-categories/tender-categories.component";


@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.sass']
})
export class AddTenderComponent implements OnInit {

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

  types: any[] = [{ name: 'CAPEX', full: 'Capital Expenditure' }, { name: 'OPEX', full: 'Operational Expenditure' }]

  constructor(
    private tenderService: TenderService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TenderCategoriesComponent>,
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
    this.dialogTitle = "Add Tender category";
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
    });
  }



  submit() {
    console.log("Form contents = ", this.Form.value.name);
    this.tenderService
      .addTender(this.Form.value)
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          this.snackbar.showNotification(
            "snackbar-success",
            "Tender added successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);

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
  public confirmAdd(): void { }
}
