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
import { AnnouncementService } from "src/app/suppliers/data/services/announcement.service";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.scss"],
})
export class JobDetailsComponent implements OnInit {
  routeState: any;
  job: any;
  announcementId: number;
  fetchedData: any;
  isLoading: boolean = false;

  loading: boolean = true;
  requirementsData: any;
  reqLoading: boolean = true;

  Form!: FormGroup;
  selectItems: any[] = [{ name: "Yes" }, { name: "No" }];

  // inputs = [
  //   {
  //     type: "username",
  //     label: "Username",
  //     inputType: "text",
  //     name: "name",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: "required",
  //         message: "Username Required",
  //       },
  //     ],
  //   },

  //   {
  //     type: "select",
  //     label: "Select",
  //     inputType: "select",
  //     name: "selectValue",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: "required",
  //         message: "Select value Required",
  //       },
  //     ],
  //   },
  //   {
  //     type: "file",
  //     label: "File",
  //     inputType: "file",
  //     name: "uploadFile",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: "required",
  //         message: "File Required",
  //       },
  //     ],
  //   },
  // ];

  inputs: any[] = [];
  fInputs: any[] = [];

  dynamicForm: FormGroup;
  dynamicFileForm: FormGroup;

  currRequirementid: any;
  currRequirementname: any;
  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;

  textInputs: any[] = [];
  selectInputs: any[] = [];
  fileInputs: any[] = [];

  //selectedFiles?: FileList;
  // currentFile?: File;
  // progress = 0;
  // message = "";
  // fileInfos?: Observable<any>;

  fileloading: boolean = false;
  isFileDataLoading: boolean = true;

  generalResponse: any = "";
  withfiles: any[] = [];

  user: any;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  // ******************************************************************************
  //form: FormGroup;

  data: TableData[] = [
    {
      file: "",
      filename: "",
      filetype: "",
      requirementid: 0,
      requirementname: "",
      supplierid: 0,
    },
  ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = [
    "requirementid",
    "requirementname",
    "filename",
    "filetype",
    "selectFile",
  ];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ filedetails: this.rows });

  // ******************************************************************************
  

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private tenderService: TenderService,
    private preqRequirements: PrequalificationReqService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private filesService: FilesService,
    private announcementService: AnnouncementService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Job details") {
        this.job = this.routeState.preqDetails
          ? JSON.parse(this.routeState.preqDetails)
          : "";

        this.localStorageService.set("selectedannouncementId", this.job.id);
      } else {
        this.routeState = "";
      }
    }
  }

  ngOnInit(): void {
    this.announcementId = this.localStorageService.get(
      "selectedannouncementId"
    );
    this.user = this.tokenStorage.getUser();
    console.log("preqDetails: ", this.announcementId);

    this.getAnnouncementViaId(this.announcementId);
  }


  getAnnouncementViaId(announcementId) {
    this.announcementService.getAnnouncementById(announcementId).subscribe(
      (res) => {
        //console.log("Requirements: ", res);

        this.requirementsData = res;

        if (this.requirementsData) {
          this.reqLoading = false;
          let arr = this.requirementsData.requirementsList;
          //console.log("arr: ", this.requirementsData);
          arr.forEach((element) => {
            if (element.type !== "file") {
              this.inputs.push(element);
            } else if (element.type === "file") {
              this.fInputs.push(element);
            }
          });
        }


        if (this.requirementsData) {
          this.generalResponse = {
            suppliername: this.user.username,
            supplierid: this.user.id,
            categorycode: this.requirementsData.categorycode,
            prequalificationid: this.requirementsData.id,
            prequalificationtitle: this.requirementsData.title,
            withfiles: [],
            withoutfiles: [],
          };
          if (this.inputs) {
            //create form for fields without file
            this.createNoFileForm();
          }
          if (this.fInputs) {
            //create form for fields with file
            this.createFileForm();
          }
          this.loading = false;
        }

        console.log("this.inputs: ", this.inputs);
        console.log("this.Fileinputs: ", this.fInputs);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  createNoFileForm() {
    const controls = {};
    this.inputs.forEach((res) => {
      this.generalResponse.withoutfiles.push({
        requirementid: res.id,
        requirementname: res.name,
        response: "",
        supplierid: this.user.id,
      });

      if (res.type == "text") {
        this.textInputs.push(res);
      }
      if (res.type == "select") {
        this.selectInputs.push(res);
      }
      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === "required") {
          validationsArray.push(Validators.required);
        }
      });
      controls[res.name] = new FormControl([], validationsArray);
    });
    this.dynamicForm = new FormGroup(controls);
  }
  createFileForm() {
    const controls = {};
    this.fInputs.forEach((res) => {
      (this.currRequirementid = res.id),
        (this.currRequirementname = res.name),
        (this.currSupplierid = this.user.id),
        this.addFileRow();

      if (res.type == "file") {
        this.fileInputs.push(res);
      }

      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === "required") {
          validationsArray.push(Validators.required);
        }
      });
      controls[res.name] = new FormControl([], validationsArray);
    });

    this.dynamicFileForm = new FormGroup(controls);

  }
  addFileRow(d?: TableData, noUpdate?: boolean) {
    this.isFileDataLoading = false;

    const row = this.fb.group({
      file: "",
      filename: "Select file",
      filetype: "Select file",
      supplierid: this.currSupplierid,
      requirementid: this.currRequirementid,
      requirementname: this.currRequirementname,
    });
    this.rows.push(row);
    this.dataSource.next(this.rows.controls);
  }
  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  onSelectFile(files, selectedRow, index) {
    console.log("row: ", selectedRow.value, index);
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

        this.rows.at(index).patchValue({
          file: this.currFile,
          filename: this.currFilename,
          filetype: this.currFiletype,
          supplierid: selectedRow.value.supplierid,
          requirementid: selectedRow.value.requirementid,
          requirementname: selectedRow.value.requirementname,
        });
        this.updateView();
      }
    });
  }
  onSubmit() {
    if (this.inputs && this.fInputs) {
      const n = this.generalResponse.withoutfiles;
      const m = Object.values(this.dynamicForm.value);

      n.forEach((val1, index) => {
        const val2 = m[index];
        console.log(val1, val2);

        val1.response = val2;
      });

      this.generalResponse.withfiles = this.rows.value;

      this.finalSubmit();
    } else if (this.inputs) {
      const n = this.generalResponse.withoutfiles;
      const m = Object.values(this.dynamicForm.value);

      n.forEach((val1, index) => {
        const val2 = m[index];
        console.log(val1, val2);

        val1.response = val2;
      });

      console.log("Value of n", n);
      this.finalSubmit();
    } else if (this.fInputs) {
      this.generalResponse.withfiles = this.rows.value;
      this.finalSubmit();
    }
  }

  finalSubmit() {
    console.log("this.generalResponse: ", this.generalResponse);

    this.preqRequirements
      .postRequirements(this.generalResponse)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ", res);
          this.snackbar.showNotification("snackbar-success", res.message + "!");
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification(
            "snackbar-danger",
            err +
            "Application failure please ensure all requirements are provided!"
          );
        }
      );
  }
}
