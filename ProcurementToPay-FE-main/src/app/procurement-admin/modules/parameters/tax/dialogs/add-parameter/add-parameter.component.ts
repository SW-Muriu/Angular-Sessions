import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ParametersService } from "src/app/procurement-admin/data/services/parameters.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TaxComponent } from "../../tax.component";

@Component({
  selector: "app-add-parameter",
  templateUrl: "./add-parameter.component.html",
  styleUrls: ["./add-parameter.component.sass"],
})
export class AddParameterComponent implements OnInit {
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

  // taxes: any[] = [
  //   { name: "VAT", value: "VAT" },
  //   { name: "VAT withholding tax (Goods)", value: "VAT withholding tax" },
  //   { name: "Income tax (Services)", value: "Income tax" },
  //   {
  //     name: "Income withholding tax (Services)",
  //     value: "Income withholding tax",
  //   },
  // ];

  taxTypes: any[] = ["Goods", "Services","Goods and Services" ];

  constructor(
    private parameterService: ParametersService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TaxComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    //this.getTaxAccountNos();
    this.Form = this.createForm();
    this.dialogTitle = "Add tax parameter";
  }

  // getTaxAccountNos() {
  //   this.subscription = this.parameterService.getAccounts().subscribe((res) => {
  //     this.accounts = res;
  //     console.log("Accounts =", this.accounts);
  //   });
  // }
  submit() {
    console.log("Form contents = ", this.Form.value);
    this.parameterService
      .addTax(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);

          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Tax parameter added successfully!"
          );
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Tax parameter upload failure!"
          );
        }
      );
  }
  // {
  //   "id": 0,
  //   "taxCode": "string",
  //   "taxName": "string",
  //   "taxRate": "string"
  // }
  createForm(): FormGroup {
    return this.fb.group({
      taxName: ["", Validators.required],
      taxRate: ["", Validators.required],
      //taxType: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {}
}
