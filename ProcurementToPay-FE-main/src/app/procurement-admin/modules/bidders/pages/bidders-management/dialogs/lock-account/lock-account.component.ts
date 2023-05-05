import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AllBiddersComponent } from '../../all-bidders/all-bidders.component';

@Component({
  selector: 'app-lock-account',
  templateUrl: './lock-account.component.html',
  styleUrls: ['./lock-account.component.sass']
})
export class LockAccountComponent extends BaseComponent implements OnInit {
  bidder: any;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<AllBiddersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private bidderService: BiddersService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log("Data ", this.data)
    this.bidder = this.data.account;

    this.userId = this.data.account.id;
  }

  confirmLock() {
    this.bidderService
      .lockAccount({ username: this.bidder.username })
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
