import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { PendingCommitteeMembersComponent } from 'src/app/admin/modules/committee-management/pages/pending-committee-members/pending-committee-members.component';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-tender',
  templateUrl: './delete-tender.component.html',
  styleUrls: ['./delete-tender.component.sass']
})
export class DeleteTenderComponent extends BaseComponent implements OnInit {
  tenderId: number;
  tender: any;

  constructor( public dialogRef: MatDialogRef<PendingCommitteeMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tenderPreparationService: TenderPreperationService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.tender = this.data.data;

    this.tenderId = this.tender.id;

    console.log("Tender ", this.tender)

    console.log("Tender Id", this.tenderId)
  }

  confirmDelete() {
    this.tenderPreparationService
      .deleteTenderById(this.tenderId)
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
