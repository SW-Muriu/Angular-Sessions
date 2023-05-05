import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { TenderAdvertService } from 'src/app/data/services/procurement-admin/tender-advert.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { PendingTendersComponent } from 'src/app/procurement-admin/modules/tender/all/pending-tenders/pending-tenders.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-verify-tender-advert',
  templateUrl: './verify-tender-advert.component.html',
  styleUrls: ['./verify-tender-advert.component.sass']
})
export class VerifyTenderAdvertComponent extends BaseComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: any[] = [
    { name: "Approved", value: "Approved" },
    { name: "Rejected", value: "Rejected" },
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
    private tenderAdvertService: TenderAdvertService
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
      id: [this.Data.id, [Validators.required]],
      status: ["", [Validators.required]],
      reason: [""],
      verifiedBy: [this.username],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Approved") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: "-" });
    } else {
      this.rejected = true;
      this.statusForm.patchValue({ reason: "" });
      
    }
  }

  changeStatus() {

    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("status", this.statusForm.value.status)
      .set("reason", this.statusForm.value.reason)
      .set("verifiedBy", this.username);

    this.tenderAdvertService.updateTenderAdvertStatus(params).subscribe(
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
