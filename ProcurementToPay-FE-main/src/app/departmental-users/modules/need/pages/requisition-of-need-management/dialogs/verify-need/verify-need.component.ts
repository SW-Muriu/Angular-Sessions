import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PendingNeedsComponent } from '../../pending-needs/pending-needs.component';

@Component({
  selector: 'app-verify-need',
  templateUrl: './verify-need.component.html',
  styleUrls: ['./verify-need.component.sass']
})
export class VerifyNeedComponent extends BaseComponent implements OnInit {

  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approved", "Rejected"];
  rejected: boolean = false;
  currentUser: any;
  params: any

  constructor(
    public dialogRef: MatDialogRef<PendingNeedsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private needRequisitionService: NeedRequisitionService,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe
  ) {
    super()
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      status: ["", [Validators.required]],
      verifiedBy: [this.currentUser, [Validators.required]],
      reason: [""],
      remarks: [""],
      timeline: [""],
      bidFee: [""],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Rejected") {
      this.rejected = true;

    }else if (selectedStatus.value == "Approved") {
      this.rejected = false;
    }
  }

  changeStatus() {
    console.log("Status Form ", this.statusForm.value)
    const params = new HttpParams()
      .set("id", this.statusForm.value.id)
      .set("status", this.statusForm.value.status)
      .set("verifiedBy", this.statusForm.value.verifiedBy)
      .set("reason", this.statusForm.value.reason)
      .set("timeline", this.datepipe.transform(this.statusForm.value.timeline, "yyyy-MM-ddTHH:mm:ss") )
      .set("remarks", this.statusForm.value.remarks)
      .set("bidFee", this.statusForm.value.bidFee);

    this.needRequisitionService.updateNeedStatus(params).subscribe(
      (res) => {
        console.log(res);
        
        this.dialogRef.close();
        this.snackbar.showNotification(
          "snackbar-success",
          "Need verified succesfully!"
        );
      },
      (err) => {
        console.log(err);

       this.dialogRef.close();
      }
    );
  }

  onCancel(){
    this.dialogRef.close()
  }

}
