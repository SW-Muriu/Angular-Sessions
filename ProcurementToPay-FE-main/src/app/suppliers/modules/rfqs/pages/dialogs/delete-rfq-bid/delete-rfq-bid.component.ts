import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { PendingCommitteeMembersComponent } from "src/app/admin/modules/committee-management/pages/pending-committee-members/pending-committee-members.component";
import { TenderAdvertService } from "src/app/data/services/procurement-admin/tender-advert.service";
import { RfqApplicationService } from "src/app/data/services/supplier/rfq-application.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-delete-rfq-bid",
  templateUrl: "./delete-rfq-bid.component.html",
  styleUrls: ["./delete-rfq-bid.component.sass"],
})
export class DeleteRfqBidComponent extends BaseComponent implements OnInit {
  quotationId: number;
  quotation: any;

  constructor(
    public dialogRef: MatDialogRef<PendingCommitteeMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tenderAdvertService: TenderAdvertService,
    private rfqApplicationService: RfqApplicationService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.quotation = this.data.data;

    console.log("Quotation ", this.quotation);

    this.quotationId = this.quotation.id;
  }

  confirmDelete() {
    this.rfqApplicationService
      .deleteRFQApplication(this.quotationId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "RFQ Application deleted successfully !"
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
