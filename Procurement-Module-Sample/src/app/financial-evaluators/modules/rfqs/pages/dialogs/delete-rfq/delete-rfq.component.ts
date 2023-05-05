import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PendingRfqsComponent } from '../../all/pending-rfqs/pending-rfqs.component';

@Component({
  selector: 'app-delete-rfq',
  templateUrl: './delete-rfq.component.html',
  styleUrls: ['./delete-rfq.component.sass']
})
export class DeleteRfqComponent extends BaseComponent implements OnInit {
  rfqId: number;
  rfq: any;

  constructor( public dialogRef: MatDialogRef<PendingRfqsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private rfqService: RfqsService,
    private snackbar: SnackbarService) {
      super();
     }

  ngOnInit(): void {
    this.rfq = this.data.data;

    this.rfqId = this.rfq.id;
  }

  confirmDelete() {
    this.rfqService
      .deleteRFQ(this.rfqId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "RFQ deleted successfully !"
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
