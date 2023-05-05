import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { User } from "../../data/types/user";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.sass"],
})
export class UpdateProfileComponent extends BaseComponent implements OnInit {
  hide = true;
  userId: number;
  user: User;
  updatePasswordForm: FormGroup;
  updateProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    //private userService: UserService
  ) {
    super()
  }

  ngOnInit(): void {

    this.getUser()
    
    //this.getUserById();

    this.updatePasswordForm = this.fb.group({
      username: ["", [Validators.required]],
      currentPassword: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
  

    this.updateProfileForm = this.fb.group({
      id: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
    });
  }

  getUser() {
    this.userId = this.tokenStorage.getUser().id;
    console.log(this.userId);

    if(this.userId){
      console.log(this.userId)
      this.getUserById(this.userId)
      
    }
  }

  getUserById(userId) {
    this.accountService.getUserById(userId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.user = res;
          this.updateProfileForm.setValue({
            id: this.user.id,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phonenumber: this.user.phonenumber
          })

          this.updatePasswordForm.patchValue({
            username: this.user.username
          })

          console.log(this.user);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updatePassword() {
    console.log(this.updatePasswordForm.value)
    if (
      this.updatePasswordForm.value.password !==
      this.updatePasswordForm.value.confirmPassword
    ) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Passwords don't match, Please check and retry!"
      );
    } else {
      this.accountService
        .updatePassword(this.updatePasswordForm.value)
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

  updateProfile() {
    this.accountService
      .updateProfile(this.updateProfileForm.value)
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
}
