import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ApprovedTendersComponent } from '../../all/approved-tenders/approved-tenders.component';

@Component({
  selector: 'app-post-tender',
  templateUrl: './post-tender.component.html',
  styleUrls: ['./post-tender.component.sass']
})
export class PostTenderComponent extends BaseComponent implements OnInit {
  tenderId: number;
  tender: any;

  constructor( public dialogRef: MatDialogRef<ApprovedTendersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tenderPreperationService: TenderPreperationService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.tender = this.data.data;

    this.tenderId = this.tender.id;

    console.log("Tender Id", this.tenderId)
  }

  postTender() {
    this.tenderPreperationService
      .postTender(this.tenderId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Cost center deleted successfully !"
          );

          this.dialogRef.close();
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
