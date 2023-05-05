import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { Role } from "../../data/types/role";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.sass"],
})
export class AddAccountComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  userLimit: FormGroup;
  roles: Role[] = [];
  departments: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
  
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      role: ["", [Validators.required]],
      department: [""],
    });

    this.getRoles();
    //this.getDepartments();
  }

  onCancel() {
    this.router.navigate([`/admin/user-accounts/all`]);
  }

  addUser() {
    console.log("User = ", {firstname: this.userForm.value.firstname,
    lastname: this.userForm.value.lastname,
    username: this.userForm.value.username,
    phonenumber: this.userForm.value.phonenumber,
    email: this.userForm.value.email,
    role: this.userForm.value.role,
    department: 'Test Department',});

    this.accountService 
      .addUser({
        firstname: this.userForm.value.firstname,
        lastname: this.userForm.value.lastname,
        username: this.userForm.value.username,
        phonenumber: this.userForm.value.phonenumber,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
        department: 'Test Department',
      })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.router.navigate([`/admin/user-accounts/all`]);
        },
        (err) => {
          this.snackbar.showNotification("snackbar-danger", err);
          console.log(err);
        }
      );
  }


  // getDepartments() {
  //   this.accountService
  //     .getDepartments()
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         console.log(res);

  //         this.departments = res;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  getRoles() {
    this.accountService
      .getRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          this.roles = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
