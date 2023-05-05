import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AccountService } from '../../data/services/account.service';
import { Account } from '../../data/types/account';
import { DeletedAccountsComponent } from '../deleted-accounts/deleted-accounts.component';

@Component({
  selector: 'app-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.sass']
})
export class RestoreAccountComponent extends BaseComponent implements OnInit {
  account: Account;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<DeletedAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.data.account;

    this.userId = this.data.user.id;
  }

  confirmRestoreAccount() {
    console.log({ username: this.account.username })
    this.accountService
      .restoreDeletedAccount({ username: this.account.username })
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
