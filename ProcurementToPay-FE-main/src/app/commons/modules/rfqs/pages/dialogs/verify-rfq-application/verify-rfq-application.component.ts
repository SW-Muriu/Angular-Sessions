import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { RfqApplicationsComponent } from "../../recieve-rfq-applications/rfq-applications/rfq-applications.component";

import { RfqApplicationService } from "../../../../../../data/services/supplier/rfq-application.service";


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
  deskEvaluator: boolean = false;
  financialEvaluator: boolean = false;
  technicalEvaluator: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RfqApplicationsComponent>,
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
      action: ["", [Validators.required]],
      applicationid: [this.Data.id],
      referenceId: [this.Data.referenceid],
      rfqId: [this.Data.rfqid],
      supplierId: [this.Data.supplierid],
      username: [this.username],
      reason: [""],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Approve") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: "-" });
    } else {
      this.rejected = true;
      this.statusForm.patchValue({ reason: "" });
    }
  }

  changeStatus() {
    console.log("Verify RFQ Application Form ", this.statusForm.value);

    this.rfqApplicationService.reviewRFQApplication(this.statusForm.value)
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification(
            "snackbar-success",
            "Status updated succesfully!"
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
