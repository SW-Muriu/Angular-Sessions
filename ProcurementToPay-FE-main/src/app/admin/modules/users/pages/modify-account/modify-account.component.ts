import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountService } from '../../data/services/account.service';
import { Account } from '../../data/types/account';
import { Role } from '../../data/types/role';



@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.sass']
})
export class ModifyAccountComponent extends BaseComponent implements OnInit {
  hide = true;
  roles: Role [] = [];
  updateRoleForm: FormGroup;
  updateDepartmentForm: FormGroup;
  updatePasswordForm: FormGroup;
  userId: number;
  account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.subject)).subscribe(param => {
      this.userId = param.id;
      console.log(this.userId)
    })



    this.getUserById()
    
    this.updateRoleForm = this.formBuilder.group({
      userid: ["", [Validators.required]],
      roleid: ["", Validators.required],
    });

    this.updateDepartmentForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      department: ["", [Validators.required]],
    });

    this.updatePasswordForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.getRoles()

  }

  getUserById(){
    this.accountService.getUserById(this.userId).pipe(takeUntil(this.subject)).subscribe(res => {
      console.log(res)
      this.account = res;
      this.updateRoleForm.patchValue({
        userid: this.account.id,
        roleid: this.account.roles[0].id
      })

      // this.updateDepartmentForm.setValue({
      //   username: this.account.username,
      //   department: this.account.department
      // })

      this.updatePasswordForm.patchValue({
        username: this.account.username
      })
    }, err => {
      console.log(err)
    })
  }

  getRoles(){
    this.accountService.getRoles().pipe(takeUntil(this.subject)).subscribe(res => {
      this.roles = res;
    }, err => {
      console.log(err)
    })
  }

  updateRole() {
    console.log(this.updateRoleForm.value);

    this.accountService
      .updateRole(this.updateRoleForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message)
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }


  updatePassword() {
    this.accountService
      .updateUserPassword(this.updatePasswordForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
