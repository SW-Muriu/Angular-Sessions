import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { PendingCommitteeMembersComponent } from 'src/app/admin/modules/committee-management/pages/pending-committee-members/pending-committee-members.component';
import { TenderAdvertService } from 'src/app/data/services/procurement-admin/tender-advert.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-tender-advert',
  templateUrl: './delete-tender-advert.component.html',
  styleUrls: ['./delete-tender-advert.component.sass']
})
export class DeleteTenderAdvertComponent extends BaseComponent implements OnInit {
  tenderAdvertId: number;
  tender: any;

  constructor( public dialogRef: MatDialogRef<PendingCommitteeMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tenderAdvertService: TenderAdvertService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.tender = this.data.data;

    this.tenderAdvertId = this.tender.id;
  }

  confirmDelete() {
    this.tenderAdvertService.deleteTenderAdvert(this.tenderAdvertId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Tender deleted successfully !"
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
