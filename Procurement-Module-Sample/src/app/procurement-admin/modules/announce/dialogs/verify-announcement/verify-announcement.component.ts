import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingAnnouncementsComponent } from "../../pending-announcements/pending-announcements.component";

@Component({
  selector: "app-verify-announcement",
  templateUrl: "./verify-announcement.component.html",
  styleUrls: ["./verify-announcement.component.sass"],
})
export class VerifyAnnouncementComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approve", "Reject"];
  rejected: boolean = false;
  currentUser: any;
  currentRole: any;

  constructor(
    public dialogRef: MatDialogRef<PendingAnnouncementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.currentRole = this.tokenService.getUser().roles[0];

    console.log("this.currentRole: ", this.currentRole);

    this.Data = this.data.data;

    console.log("Data: ", this.Data);
    this.statusForm = this.createStatusForm();
  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, [Validators.required]],
      referenceid: [this.Data.referenceid],
      status: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Reject") {
      this.statusForm.patchValue({ reason: null });
      this.rejected = true;
    }
    if (selectedStatus.value == "Pending") {
      this.statusForm.patchValue({ reason: "-" });
    }
    if (selectedStatus.value == "Approve") {
      this.statusForm.patchValue({ reason: "-" });
    }
  }

  changeStatus() {
    if(this.currentRole === 'ROLE_PROCUREMENT_ADMIN'){
      this.announcementService
      .updateAnnouncementStatusProcAdmin({
        id: this.statusForm.value.id,
        action: this.statusForm.value.status,
        referenceid: this.statusForm.value.referenceid,
        remarks: this.statusForm.value.reason,
        username: this.statusForm.value.verifiedBy
      })
      .subscribe(
        (res) => {
          this.dialogRef.close();

          this.snackbar.showNotification("snackbar-success", "Status updated sucessfully (Proc-Admin)!");
        },
        (err) => {
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
    }else if(this.currentRole === 'ROLE_DESK'){
      this.announcementService
      .updateAnnouncementStatusDesk({
        id: this.statusForm.value.id,
        action: this.statusForm.value.status,
        referenceid: this.statusForm.value.referenceid,
        remarks: this.statusForm.value.reason,
        username: this.statusForm.value.verifiedBy
      })
      .subscribe(
        (res) => {
          this.dialogRef.close();

          this.snackbar.showNotification("snackbar-success", "Status updated sucessfully (Desk-Admin)!");
        },
        (err) => {
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );

    }
    console.log("this.statusForm.value: ", this.statusForm.value);
    
  }
}
