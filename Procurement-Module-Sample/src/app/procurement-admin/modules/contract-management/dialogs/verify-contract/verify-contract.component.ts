import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { ContractsService } from "src/app/procurement-admin/data/services/contracts.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingContractsComponent } from "../../pending-contracts/pending-contracts.component";

@Component({
  selector: "app-verify-contract",
  templateUrl: "./verify-contract.component.html",
  styleUrls: ["./verify-contract.component.sass"],
})
export class VerifyContractComponent implements OnInit {
  Data: any;

  statusForm: FormGroup;
  statusTypes: string[] = ["Approve", "Reject"];
  rejected: boolean = false;
  currentUser: any;
  currentRole: any;
  selectedOption: string;

  constructor(
    public dialogRef: MatDialogRef<PendingContractsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
    public datepipe: DatePipe,
    private router: Router,
    private applicationSerice: ContractsService
  ) {}
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
      verifiedBy: [this.currentUser, [Validators.required]],
      verifiedTime: [new Date(), [Validators.required]],
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Reject") {
      this.selectedOption = "N";
      this.statusForm.patchValue({ reason: null });
      this.rejected = true;
    }

    if (selectedStatus.value == "Approve") {
      this.selectedOption = "Y";
      this.statusForm.patchValue({ reason: "-" });
      this.rejected = false;
    }
  }
  //   Id
  // roleFinancial
  // roleDesk
  // roleTechnical
  // reason
  // verifiedBy

  // Financial = "ROLE_FINANCIAL",
  // Technical = "ROLE_TECHNICAL",
  // Desk = "ROLE_DESK",
  changeStatus() {
    

    if (this.currentRole === "ROLE_FINANCIAL") {
      this.applicationSerice
        .updateContractStatus({
          contract_id: this.statusForm.value.id,
          roleFinancial: this.selectedOption,
          reason: this.statusForm.value.reason,
          verifiedBy: this.statusForm.value.verifiedBy,
        })
        .subscribe(
          (res) => {
            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Application verification successful!"
            );
            this.router.navigateByUrl(
              "/procurement-admin/contract-management/pending-contracts"
            );
          },
          (err) => {
            this.snackbar.showNotification("snackbar-danger", err);
          }
        );
    } else if (this.currentRole === "ROLE_TECHNICAL") {
      this.applicationSerice
        .updateContractStatus({
          contract_id: this.statusForm.value.id,
          roleTechnical: this.selectedOption,
          reason: this.statusForm.value.reason,
          verifiedBy: this.statusForm.value.verifiedBy,
        })
        .subscribe(
          (res) => {
            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Application verification successful!"
            );
            this.router.navigateByUrl(
              "/procurement-admin/contract-management/pending-contracts"
            );
          },
          (err) => {
            this.snackbar.showNotification("snackbar-danger", err);
          }
        );
    } else if (this.currentRole === "ROLE_DESK") {
      console.log("this.statusForm.value: ", {
        contract_id: this.statusForm.value.id,
          roleDesk: this.selectedOption,
          reason: this.statusForm.value.reason,
          verifiedBy: this.statusForm.value.verifiedBy,
      });
      this.applicationSerice
        .updateContractStatus({
          contract_id: this.statusForm.value.id,
          roleDesk: this.selectedOption,
          reason: this.statusForm.value.reason,
          verifiedBy: this.statusForm.value.verifiedBy,
        })
        .subscribe(
          (res) => {
            this.dialogRef.close();

            this.snackbar.showNotification(
              "snackbar-success",
              "Application verification successful!"
            );
            this.router.navigateByUrl(
              "/procurement-admin/contract-management/pending-contracts"
            );
          },
          (err) => {
            this.snackbar.showNotification("snackbar-danger", err);
          }
        );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Contract Verification is restricted to ROLE_FINANCIAL, ROLE_TECHNICAL and ROLE_DESK!!"
      );
    }
  }
}
