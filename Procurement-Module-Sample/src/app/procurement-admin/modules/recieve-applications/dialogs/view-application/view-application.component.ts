import { HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {
  SelectedFiles,
  FilesService,
} from "src/app/suppliers/data/fileconversion/files.service";
import { PrequalificationReqService } from "src/app/suppliers/data/services/prequalifications.service";
import { TenderService } from "src/app/suppliers/data/services/tenders.service";

import { ViewChild } from "@angular/core";
import { FormArray, AbstractControl } from "@angular/forms";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableData } from "src/app/suppliers/data/models/FileTableModel";
import { ApplicationsService } from "src/app/procurement-admin/data/services/applications.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { VerifyApplicationComponent } from "../verify-application/verify-application.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-view-application",
  templateUrl: "./view-application.component.html",
  styleUrls: ["./view-application.component.sass"],
})
export class ViewApplicationComponent implements OnInit {
  routeState: any;
  job: any;
  applicationId: number;

  fetchedData: any;
  isLoading: boolean = false;

  loading: boolean = true;
  requirementsData: any;

  Form!: FormGroup;
  selectItems: any[] = [{ name: "Yes" }, { name: "No" }];

  inputs: any[] = [];
  fInputs: any[] = [];

  

  user: any;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  applicationData: any;
  applicationLoading: boolean = true;

  withFileInputs: any;
  noFileInputs: any;
  p: number = 1;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private tokenStorage: TokenStorageService,
    private applicationService: ApplicationsService,
    public dialog: MatDialog,
    private snackbar: SnackbarService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Job details") {
        this.job = this.routeState.jobDetails
          ? JSON.parse(this.routeState.jobDetails)
          : "";

        this.localStorageService.set("selectedapplicationId", this.job.id);
      } else {
        this.routeState = "";
      }
    }
  }

  ngOnInit(): void {
    this.applicationId = this.localStorageService.get("selectedapplicationId");
    this.user = this.tokenStorage.getUser();
    this.getApplicationById(this.applicationId);
  }

  getApplicationById(applicationId) {
    //const params = new HttpParams().set("id", applicationId);
    this.applicationService.getApplicationById(applicationId).subscribe(
      (res) => {
        // console.log("applicationId: ", res);

        this.applicationData = res;

        if (this.applicationData) {
          this.applicationLoading = false;
          this.noFileInputs = this.applicationData.withoutfiles;
          this.withFileInputs = this.applicationData.withfiles;

          console.log(
            "applicationId withfiles: ",
            this.applicationData.withfiles
          );
          console.log(
            "applicationId withoutfiles: ",
            this.applicationData.withoutfiles
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  onClickDownloadPdf(item: any) {
    let base64String = item.file;
    this.downloadPdf(base64String, item.filename);
  }

  downloadPdf(base64String, fileName) {
    // Download PDF in Chrome etc.
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  verify(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: this.applicationData
    };
    const dialogRef = this.dialog.open(VerifyApplicationComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  
  }
}
