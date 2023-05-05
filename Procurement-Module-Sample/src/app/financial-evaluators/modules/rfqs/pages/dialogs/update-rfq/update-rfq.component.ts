import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingRfqsComponent } from "../../all/pending-rfqs/pending-rfqs.component";

@Component({
  selector: "app-update-rfq",
  templateUrl: "./update-rfq.component.html",
  styleUrls: ["./update-rfq.component.sass"],
})
export class UpdateRfqComponent extends BaseComponent implements OnInit {
  rfqForm: FormGroup;
  dyForm: FormGroup;
  currentUser: any;
  rfqDetails: any;
  rfqParticulars: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PendingRfqsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialog: MatDialog,
    private tokenService: TokenStorageService,
    private rfqService: RfqsService
  ) {
    super();

    this.rfqDetails = data.data;
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;

    this.rfqForm = this.createRFQForm();

    if(this.rfqDetails){

      console.log("RFQ Details", this.rfqDetails)

      this.rfqForm.patchValue({
        title: this.rfqDetails.title,
        bidFee: this.rfqDetails.bidFee,
        responseDeadline: this.rfqDetails.responseDeadline,
        projectDeadline: this.rfqDetails.projectDeadline,
        postedBy: this.rfqDetails.postedBy,
        postedTime: this.rfqDetails.postedTime,
        rfqCode: this.rfqDetails.rfqCode,
        rfqStatus: this.rfqDetails.rfqStatus,
        status: this.rfqDetails.status,
        deadlineStatus: this.rfqDetails.deadlineStatus,
        id:this.rfqDetails.id,
      });

      this.rfqParticulars = this.rfqDetails.particulars;

      this.rfqParticulars.forEach(particular => {
        this.t.push(
          (this.dyForm = this.fb.group({
            id: particular.id,
            item: particular.item,
            description: particular.description,
            quantity: particular.quantity,
            unitPrice: particular.unitPrice,
            totalPrice: particular.totalPrice,
          }))
        );
      })

      console.log("RFQ Particulars", this.rfqParticulars)
    }

  }

  createRFQForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required]],
      bidFee: ["", [Validators.required]],
      particulars: new FormArray([]),
      responseDeadline: ["", [Validators.required]],
      projectDeadline: ["", [Validators.required]],
      postedBy: [""],
      postedTime: [""],
      rfqCode: [""],
      rfqStatus: [""],
      status: [""],
      deadlineStatus: [""],
      id:[""],
      modifiedBy: [this.currentUser],
      modifiedTime: [new Date()],
    });
  }
  get f() {
    return this.rfqForm.controls;
  }
  get t() {
    return this.f.particulars as FormArray;
  }

  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
        item: [""],
        description: [""],
        quantity: [""],
        unitPrice: [""],
        totalPrice: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  addCostCenter() {
    console.log("RFQ Format: ", this.rfqForm.value);
    this.rfqService.updateRFQ(this.rfqForm.value).subscribe(
      (res) => {
        this.snackbar.showNotification(
          "snackbar-success",
          "RFQ updated successfully !"
        );
        this.dialogRef.close();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
