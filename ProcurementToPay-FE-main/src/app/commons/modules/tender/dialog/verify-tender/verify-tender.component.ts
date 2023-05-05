import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingTendersComponent } from "../../all/pending-tenders/pending-tenders.component";

@Component({
  selector: "app-verify-tender",
  templateUrl: "./verify-tender.component.html",
  styleUrls: ["./verify-tender.component.sass"],
})
export class VerifyTenderComponent extends BaseComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: any[] = [
    { name: "Approved", value: "Y" },
    { name: "Rejected", value: "N" },
  ];
  rejected: boolean = false;
  currentUser: any;
  role: any;
  username: any;
  deskEvaluator: boolean = false;
  financialEvaluator: boolean = false;
  technicalEvaluator: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PendingTendersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private cdref: ChangeDetectorRef,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe,
    private tenderPreperationService: TenderPreperationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.username = this.currentUser.username;

    this.role = this.currentUser.roles[0];

    if (this.role === "ROLE_DESK") {
      this.deskEvaluator = true;
    } else if (this.role === "ROLE_FINANCIAL") {
      this.financialEvaluator = true;
    } else {
      this.technicalEvaluator = true;
    }

    this.Data = this.data.data;

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      roleFinancial: [""],
      roleDesk: [""],
      roleTechnical: [""],
      reason: [""],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Y") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: "-" });
    } else {
      this.rejected = true;
      this.statusForm.patchValue({ reason: "" });
      
    }
  }

  changeStatus() {
  
    // this.toDate  = this.datepipe.transform(this.statusForm.value.status.verifiedTime, 'yyyy-MM-ddTHH:mm:ss');
    // let date=new Date();
    // let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    // console.log("Form = ", latest_date);

    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("roleFinancial", this.statusForm.value.roleFinancial)
      .set("roleDesk", this.statusForm.value.roleDesk)
      .set("roleTechnical", this.statusForm.value.roleTechnical)
      .set("verifiedBy", this.username)
      .set("reason", this.statusForm.value.reason)
      .set("verifiedTime", new Date().toDateString());

    this.tenderPreperationService.updateTenderStatus(params).subscribe(
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
