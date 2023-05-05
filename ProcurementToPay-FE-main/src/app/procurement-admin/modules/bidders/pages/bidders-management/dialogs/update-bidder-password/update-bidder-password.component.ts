import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AllBiddersComponent } from '../../all-bidders/all-bidders.component';

@Component({
  selector: 'app-update-bidder-password',
  templateUrl: './update-bidder-password.component.html',
  styleUrls: ['./update-bidder-password.component.sass']
})
export class UpdateBidderPasswordComponent extends BaseComponent implements OnInit {
  Data: any;

  updatePasswordForm: FormGroup;
  actions: string[] = ["Approve", "Reject"];
  rejected: boolean = false;
  currentUser: any;

  submitted = false;
  loading = false;
  error = "";
  hide = true;


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AllBiddersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private biddersService: BiddersService,
    private tokenService: TokenStorageService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.account;

    console.log("Data: ", this.Data.emailaddress);
    this.updatePasswordForm = this.createUpdatePasswordForm();
  }

  createUpdatePasswordForm(): FormGroup {
    return this.fb.group({
      username: [this.Data.emailaddress],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    });
  }

  updatePassword() {
    console.log(this.updatePasswordForm.value.password);
    console.log(this.updatePasswordForm.value);

    if(this.updatePasswordForm.value.password == this.updatePasswordForm.value.confirmPassword){
      this.biddersService.updateBidderPassword(this.updatePasswordForm.value).pipe(takeUntil(this.subject)).subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Status updated succesfully!"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
    }else {
      this.snackbar.showNotification("snackbar-danger",
      "Passwords don't match!")

      this.dialogRef.close();
    }

    
  }

  onCancel(){
    this.dialogRef.close()
  }
}
