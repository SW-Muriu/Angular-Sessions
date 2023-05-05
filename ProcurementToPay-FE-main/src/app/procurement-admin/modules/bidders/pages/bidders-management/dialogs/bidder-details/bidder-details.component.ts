import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AllBiddersComponent } from '../../all-bidders/all-bidders.component';

@Component({
  selector: 'app-bidder-details',
  templateUrl: './bidder-details.component.html',
  styleUrls: ['./bidder-details.component.sass']
})
export class BidderDetailsComponent extends BaseComponent implements OnInit {

  bidder: any;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<AllBiddersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  ngOnInit(): void {
    this.bidder = this.data.account;
    console.log(this.bidder);
  }
}
