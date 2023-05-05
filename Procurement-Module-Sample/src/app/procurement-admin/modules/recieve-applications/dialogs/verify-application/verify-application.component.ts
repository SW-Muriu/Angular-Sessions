import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { ApplicationsService } from "src/app/procurement-admin/data/services/applications.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingApplicationsComponent } from "../../pending-applications/pending-applications.component";

@Component({
  selector: "app-verify-application",
  templateUrl: "./verify-application.component.html",
  styleUrls: ["./verify-application.component.sass"],
})
export class VerifyApplicationComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approve", "Reject"];
  rejected: boolean = false;
  currentUser: any;
  currentRole: any;

  constructor(
    public dialogRef: MatDialogRef<PendingApplicationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe,
    private router: Router,
    private applicationSerice: ApplicationsService
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
      status: ["", [Validators.required]],
      reason: ["", [Validators.required]],
      preqalificationid: this.Data.prequalificationid,
      supplierid: this.Data.supplierid,
      categorycode: this.Data.categorycode,
      referenceno: this.Data.referenceid,
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
  // {
  //   "action": "string",
  //   "categorycode": "string",
  //   "preqalificationid": "string",
  //   "referenceno": "string",
  //   "remarks": "string",
  //   "supplierid": "string",
  //   "username": "string"
  // }
  //   {
  //     "id": 4,
  //     "supplierid": "7",
  //     "categorycode": "POSTBANK_2022_72993",
  //     "action": "Approve",
  //     "remarks": "-",
  //     "username": "procadmin"
  // }
  changeStatus() {
    if (this.currentRole === "ROLE_PROCUREMENT_ADMIN") {
      this.applicationSerice
        .updatePreqApplicationStatusProcAdmin({
          id: this.statusForm.value.id,
          preqalificationid: this.Data.prequalificationid,
          supplierid: this.statusForm.value.supplierid,
          categorycode: this.statusForm.value.categorycode,
          referenceno: this.Data.referenceid,
          action: this.statusForm.value.status,
          remarks: this.statusForm.value.reason,
          username: this.statusForm.value.verifiedBy,
          suppliername: this.Data.suppliername
        })
        .subscribe(

          (res) => {

            // console.log("this.statusForm.value: ", {
            //   id: this.statusForm.value.id,
            //   preqalificationid: this.Data.prequalificationid,
            //   supplierid: this.statusForm.value.supplierid,
            //   categorycode: this.statusForm.value.categorycode,
            //   referenceno: this.Data.referenceid,
            //   action: this.statusForm.value.status,
            //   remarks: this.statusForm.value.reason,
            //   username: this.statusForm.value.verifiedBy,
            //   suppliername: this.Data.suppliername
            // });
            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Application verification successful!"
            );
            this.router.navigateByUrl(
              "/procurement-admin/recieved-applications/pending"
            );
          },
          (err) => {
            this.snackbar.showNotification("snackbar-danger", err);
          }
        );
    } else if (this.currentRole === "ROLE_DESK") {
      // this.announcementService
      //   .updateAnnouncementStatusDesk({
      //     id: this.statusForm.value.id,
      //     action: this.statusForm.value.status,
      //     referenceid: this.statusForm.value.referenceid,
      //     remarks: this.statusForm.value.reason,
      //     username: this.statusForm.value.verifiedBy,
      //   })
      //   .subscribe(
      //     (res) => {
      //       this.dialogRef.close();

      //       this.snackbar.showNotification(
      //         "snackbar-success",
      //         "Status updated sucessfully (Desk-Admin)!"
      //       );
      //     },
      //     (err) => {
      //       this.snackbar.showNotification("snackbar-danger", err);
      //     }
      //   );
    }

  }
}
