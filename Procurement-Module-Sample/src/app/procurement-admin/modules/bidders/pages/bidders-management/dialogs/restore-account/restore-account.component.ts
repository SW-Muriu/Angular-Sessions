import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AllBiddersComponent } from '../../all-bidders/all-bidders.component';

@Component({
  selector: 'app-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.sass']
})
export class RestoreAccountComponent extends BaseComponent implements OnInit {
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

  restoreBidder() {
    this.bidderService.restoreAccount({ username: this.bidder.emailaddress })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
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
