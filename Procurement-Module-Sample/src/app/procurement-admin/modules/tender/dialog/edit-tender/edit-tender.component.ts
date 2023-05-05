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
  selector: 'app-edit-tender',
  templateUrl: './edit-tender.component.html',
  styleUrls: ['./edit-tender.component.sass']
})
export class EditTenderComponent implements OnInit {

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

    console.log("test: ", this.Data);
    this.Form = this.createForm();
    this.dialogTitle = "Edit Tender category";
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id],
      name: [this.Data.name, Validators.required],
      code: [this.Data.code],
      type: [this.Data.type, Validators.required],
    });
  }

  
  submit() {
    console.log("Form contents = ", this.Form.value);
    this.tenderService
      .updateTender(this.Form.value)
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
