import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { RfqApplicationService } from "src/app/data/services/supplier/rfq-application.service";
import { PendingTendersComponent } from "src/app/procurement-admin/modules/tender/all/pending-tenders/pending-tenders.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-verify-rfq-application",
  templateUrl: "./verify-rfq-application.component.html",
  styleUrls: ["./verify-rfq-application.component.sass"],
})
export class VerifyRfqApplicationComponent
  extends BaseComponent
  implements OnInit
{
  Data: any;

  statusForm: FormGroup;
  statusTypes: any[] = [
    { name: "Approve", value: "Approve" },
    { name: "Reject", value: "Reject" },
  ];
  rejected: boolean = false;
  currentUser: any;
  role: any;
  username: any;

  constructor(
    public dialogRef: MatDialogRef<PendingTendersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private cdref: ChangeDetectorRef,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe,
    private rfqApplicationService: RfqApplicationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.username = this.currentUser.username;

    this.role = this.currentUser.roles[0];

    this.Data = this.data.data;

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      applicationid: [this.Data.id, [Validators.required]],
      action: ["", [Validators.required]],
      referenceId: [this.Data.referenceid, [Validators.required]],
      rfqId: [this.Data.rfqid, [Validators.required]],
      supplierId: [this.Data.supplierid, [Validators.required]],
      username: [this.username],
      reason: [""]
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Approve") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: "-" });
    } else {
      this.rejected = true;
      this.statusForm.patchValue({ reason: " " });
    }
  }

  changeStatus() {
    console.log("Status Form ", this.statusForm.value);
    
    // this.rfqApplicationService.reviewRFQApplication(this.statusForm.value)
    //   .subscribe(
    //     (res) => {

    //       console.log(res)
          
    //       this.snackbar.showNotification(
    //         "snackbar-success",
    //         "Status updated succesfully!"
    //       );

    //       this.dialogRef.close();
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }

  onCancel(){
    this.dialogRef.close();
  }
}
