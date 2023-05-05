import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AllBiddersComponent } from '../../all-bidders/all-bidders.component';

@Component({
  selector: 'app-activate-bidder-account',
  templateUrl: './activate-bidder-account.component.html',
  styleUrls: ['./activate-bidder-account.component.sass']
})
export class ActivateBidderAccountComponent extends BaseComponent implements OnInit {
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
    this.bidder = this.data.any;

    this.userId = this.data.account.id;
  }

  activateAccount() {
    this.bidderService.activateBidderAccount({ username: this.bidder.emailaddress })
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
