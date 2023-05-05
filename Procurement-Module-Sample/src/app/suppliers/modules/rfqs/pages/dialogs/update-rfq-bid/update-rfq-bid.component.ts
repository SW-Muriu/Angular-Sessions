import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { BiddersService } from "src/app/data/services/procurement-admin/bidders.service";
import { RfqApplicationService } from "src/app/data/services/supplier/rfq-application.service";
import { PendingRfqsComponent } from "src/app/financial-evaluators/modules/rfqs/pages/all/pending-rfqs/pending-rfqs.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {
  SelectedFiles,
  FilesService,
} from "src/app/suppliers/data/fileconversion/files.service";

@Component({
  selector: "app-update-rfq-bid",
  templateUrl: "./update-rfq-bid.component.html",
  styleUrls: ["./update-rfq-bid.component.sass"],
})
export class UpdateRfqBidComponent extends BaseComponent implements OnInit {
  bidRfqForm: FormGroup;
  dyForm: FormGroup;
  currentUser: any;
  user: any;
  rfqDetails: any;
  rfqDocuments: any[] = [];
  supplierDetails: any;

  announcementId: number;
  fetchedData: any;
  isLoading: boolean = false;

  isFileDataLoading: boolean = true;

  generalResponse: any = "";
  withfiles: any[] = [];

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ filedetails: this.rows });

  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;

  constructor(
    public dialogRef: MatDialogRef<PendingRfqsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    public dialog: MatDialog,
    private tokenService: TokenStorageService,
    private rfqService: RfqsService,
    private biddersService: BiddersService,
    private filesService: FilesService,
    private rfqApplication: RfqApplicationService
  ) {
    super();

    this.rfqDetails = data.data;

    console.log("RFQ DETAILS", this.rfqDetails);
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;

    this.user = this.tokenService.getUser();

    this.bidRfqForm = this.createBidRfqForm();

    if (this.rfqDetails) {
      this.bidRfqForm.patchValue({
        rfqid: this.rfqDetails.rfqid,
        rfqtitle: this.rfqDetails.rfqtitle,
        supplieremail: this.rfqDetails.supplieremail,
        supplierid: this.rfqDetails.supplierid,
        suppliername: this.rfqDetails.suppliername,
        applicationstatusreceived: this.rfqDetails.applicationstatusreceived,
        createdon: this.rfqDetails.createdon,
        id: this.rfqDetails.id,
        modifiedby: this.rfqDetails.modifiedby,
        reason: this.rfqDetails.reason,
        referenceid: this.rfqDetails.referenceid,
        reviewedby: this.rfqDetails.reviewedby,
        reviewedon: this.rfqDetails.reviewedon,
        status: this.rfqDetails.status,
      });

      console.log("RFQ Documents", this.rfqDetails.rfqDocuments)

      this.rfqDocuments.forEach(document => {
        this.t.push(this.dyForm = this.fb.group({
          id: document.id,
          data: document.data,
          filename: document.filename,
          postedDate: document.postedDate,
          rfqid: document.rfqid,
        }))
      })
    }

    if (this.user) {
      this.bidRfqForm.patchValue({
        supplieremail: this.user.email,
        supplierid: this.user.id,
        suppliername: this.user.username,
      });
    }
  }

  createBidRfqForm(): FormGroup {
    return this.fb.group({
      rfqid: [""],
      rfqtitle: ["", [Validators.required]],
      supplieremail: ["", [Validators.required]],
      supplierid: [""],
      suppliername: ["", [Validators.required]],
      rfqDocuments: new FormArray([]),
      applicationstatusreceived: true,
      createdon: [""],
      id: [""],
      modifiedby: [""],
      reason: [""],
      referenceid: [""],
      reviewedby: [""],
      reviewedon: [""],
      status: [""],
    });
  }
  get f() {
    return this.bidRfqForm.controls;
  }
  get t() {
    return this.f.rfqDocuments as FormArray;
  }

  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
        id: [],
        data: [""],
        filename: [""],
        postedDate: [new Date()],
        rfqid: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  onSelectFile(files) {
    console.log("row: ", files.value);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);

        this.selectedFiles = res;
        console.log("selectedFiles: ", this.selectedFiles);
        this.currFile = this.selectedFiles[0].base64;
        this.currFilename = this.selectedFiles[0].name;
        this.currFiletype = this.selectedFiles[0].file.type;

        this.selectedFiles.forEach((selectedFile) => {
          this.t.push(
            (this.dyForm = this.fb.group({
              data: selectedFile.base64,
              filename: selectedFile.name,
              postedDate: new Date(),
              rfqid: this.rfqDetails.id,
            }))
          );
        });
      }
    });
  }

  sendQuatation() {
    console.log("RFQ Format: ", this.bidRfqForm.value);
    this.rfqApplication.bidRFQ(this.bidRfqForm.value).subscribe(
      (res) => {
        console.log("RFQ Format", this.bidRfqForm.value);

        this.snackbar.showNotification("snackbar-success", res.message);
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
