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
  selector: "app-edit-parameter",
  templateUrl: "./edit-parameter.component.html",
  styleUrls: ["./edit-parameter.component.sass"],
})
export class EditParameterComponent implements OnInit {
  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

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
  taxTypes: any[] = ["Goods", "Services", "Goods and Services"];

  subscription!: Subscription;
  accounts: any;

  constructor(
    private parameterService: ParametersService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TaxComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
    //this.getTaxAccountNos();
    this.Form = this.createForm();
    this.dialogTitle = "Edit tax parameters";
  }
  // getTaxAccountNos() {
  //   this.subscription = this.parameterService.getAccounts().subscribe((res) => {
  //     this.accounts = res;
  //     console.log("Accounts =", this.accounts);
  //   });
  // }
  createForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, Validators.required],

      taxCode: [this.Data.taxCode],
      taxName: [this.Data.taxName, Validators.required],
      //taxType: [this.Data.taxType, Validators.required],
      taxRate: [this.Data.taxRate, Validators.required],
      deletedBy: [this.Data.deletedBy],
      deletedFlag: [this.Data.deletedFlag],
      deletedTime: [this.Data.deletedTime],
      modifiedBy: [this.Data.modifiedBy],
      modifiedFlag: [this.Data.modifiedFlag],
      modifiedTime: [this.Data.modifiedTime],
      postedFlag: [this.Data.postedFlag],
      postedTime: [this.Data.postedTime],
      reason: [this.Data.reason],
      status: [this.Data.status],
      verifiedBy: [this.Data.verifiedBy],
      verifiedFlag: [this.Data.verifiedFlag],
      verifiedTime: [this.Data.verifiedTime],
    });
  }

  onSubmit() {
    console.log("this.Form.value ", this.Form.value);
    this.parameterService
      .updateTax(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);

          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Tax parameters updated successfully!"
          );
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
}
