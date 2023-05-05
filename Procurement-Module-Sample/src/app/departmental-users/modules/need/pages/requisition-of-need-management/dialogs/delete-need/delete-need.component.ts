import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { PendingCommitteeMembersComponent } from 'src/app/admin/modules/committee-management/pages/pending-committee-members/pending-committee-members.component';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-need',
  templateUrl: './delete-need.component.html',
  styleUrls: ['./delete-need.component.sass']
})
export class DeleteNeedComponent extends BaseComponent implements OnInit {
  needId: number;
  need: any;

  constructor( public dialogRef: MatDialogRef<PendingCommitteeMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private needRequisitionServcie: NeedRequisitionService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.need = this.data.data;

    this.needId = this.need.id;
  }

  confirmDelete() {
    this.needRequisitionServcie
      .deleteNeed(this.needId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Need deleted successfully !"
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
