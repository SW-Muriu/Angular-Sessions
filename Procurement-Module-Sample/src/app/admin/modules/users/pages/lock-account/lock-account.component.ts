import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";
import { ActiveAccountsComponent } from "../active-accounts/active-accounts.component";

@Component({
  selector: "app-lock-account",
  templateUrl: "./lock-account.component.html",
  styleUrls: ["./lock-account.component.sass"],
})
export class LockAccountComponent extends BaseComponent implements OnInit {
  account: Account;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<ActiveAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.data.account;

    this.userId = this.data.account.id;
  }

  confirmLock() {
    this.accountService
      .lockUserAccount({ username: this.account.username, status: true })
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

  deactivateUserAccount() {
    console.log({ username: this.account.username, status: false });
    this.accountService
      .deactivateUserAccount({ username: this.account.username, status: false })
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
