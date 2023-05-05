import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { Role } from "../../data/types/role";
import { ActiveAccountsComponent } from "../active-accounts/active-accounts.component";

@Component({
  selector: "app-update-account",
  templateUrl: "./update-account.component.html",
  styleUrls: ["./update-account.component.sass"],
})
export class UpdateAccountComponent extends BaseComponent implements OnInit {
  accountForm: FormGroup;
  roles: Role[] = [];
  departments: any;

  constructor(
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackbar: SnackbarService,
    private router: Router,
  ) {
    super();

    this.accountForm = this.updateAccountForm();
  }

  ngOnInit(): void {
    console.log(this.data.user.roles[0].name);
    this.getRoles();
    this.getDepartments();
  }

  getRoles() {
    this.accountService
      .getRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.roles = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getDepartments() {
    this.accountService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          this.departments = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateAccountForm(): FormGroup {
    return this.fb.group({
      firstname: [this.data.user.firstname, [Validators.required]],
      lastname: [this.data.user.lastname, [Validators.required]],
      username: [this.data.user.username, [Validators.required]],
      phonenumber: [this.data.user.phonenumber, [Validators.required]],
      email: [this.data.user.email, [Validators.required]],
      id: [this.data.user.id, [Validators.required]],
      department: [this.data.user.department, [Validators.required]],
    });
  }

  updateAccount() {
    this.accountService
      .updateUser(this.accountForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.updateDepartment();
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  updateDepartment() {
    this.accountService
      .updateUserDepartment({
        department: this.accountForm.value.department,
        username: this.accountForm.value.username,
      })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
