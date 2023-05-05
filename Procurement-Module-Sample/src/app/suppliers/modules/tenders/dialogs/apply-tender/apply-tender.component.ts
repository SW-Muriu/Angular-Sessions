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
  selector: "app-apply-tender",
  templateUrl: "./apply-tender.component.html",
  styleUrls: ["./apply-tender.component.sass"],
})
export class ApplyTenderComponent implements OnInit {
  // requirementsData = {
  //   mandatoryRequirements: [
  //     {
  //       id: 1,
  //       type: "text",
  //       label: "Name",
  //       inputType: "Text",
  //       name: "name",
  //       validations: [
  //         {
  //           id: 1,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       type: "text",
  //       label: "Phone number",
  //       inputType: "Text",
  //       name: "phonenumber",
  //       validations: [
  //         {
  //           id: 2,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       type: "select",
  //       label: "Certified ",
  //       inputType: "Select",
  //       name: "certified",
  //       validations: [
  //         {
  //           id: 3,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       type: "file",
  //       label: "National ID",
  //       inputType: "File",
  //       name: "nationalid",
  //       validations: [
  //         {
  //           id: 4,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //   ],
  //   financialRequirements: [
  //     {
  //       id: 1,
  //       type: "text",
  //       label: "Name",
  //       inputType: "Text",
  //       name: "name",
  //       validations: [
  //         {
  //           id: 1,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       type: "text",
  //       label: "Phone number",
  //       inputType: "Text",
  //       name: "phonenumber",
  //       validations: [
  //         {
  //           id: 2,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       type: "select",
  //       label: "Certified ",
  //       inputType: "Select",
  //       name: "certified",
  //       validations: [
  //         {
  //           id: 3,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       type: "file",
  //       label: "National ID",
  //       inputType: "File",
  //       name: "nationalid",
  //       validations: [
  //         {
  //           id: 4,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       type: "file",
  //       label: "Passport Doc Finance",
  //       inputType: "File",
  //       name: "passport",
  //       validations: [
  //         {
  //           id: 4,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //   ],
  //   technicalRequirements: [
  //     {
  //       id: 1,
  //       type: "text",
  //       label: "Name",
  //       inputType: "Text",
  //       name: "name",
  //       validations: [
  //         {
  //           id: 1,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       type: "text",
  //       label: "Phone number",
  //       inputType: "Text",
  //       name: "phonenumber",
  //       validations: [
  //         {
  //           id: 2,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       type: "select",
  //       label: "Certified ",
  //       inputType: "Select",
  //       name: "certified",
  //       validations: [
  //         {
  //           id: 3,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       type: "file",
  //       label: "National ID",
  //       inputType: "File",
  //       name: "nationalid",
  //       validations: [
  //         {
  //           id: 4,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       type: "file",
  //       label: "Cert of Compliance",
  //       inputType: "File",
  //       name: "certofcompliance",
  //       validations: [
  //         {
  //           id: 4,
  //           name: "required",
  //           validator: "required",
  //           message: "This field is Required",
  //         },
  //       ],
  //     },
  //   ],
  // };

  requirementsData: any;

  routeState: any;
  tender: any;
  tenderData: any;
  fetchedData: any;
  isLoading: boolean = false;

  loading: boolean = true;

  reqLoading: boolean = true;

  selectItems: any[] = [{ name: "Yes" }, { name: "No" }];

  inputsM: any[] = [];
  fInputsM: any[] = [];
  inputsF: any[] = [];
  fInputsF: any[] = [];
  inputsT: any[] = [];
  fInputsT: any[] = [];

  currRequirementid: any;
  currRequirementname: any;
  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;

  textInputsM: any[] = [];
  selectInputsM: any[] = [];
  fileInputsM: any[] = [];
  textInputsF: any[] = [];
  selectInputsF: any[] = [];
  fileInputsF: any[] = [];
  textInputsT: any[] = [];
  selectInputsT: any[] = [];
  fileInputsT: any[] = [];

  fileloading: boolean = false;
  isFileDataLoading: boolean = true;

  generalResponse: any = "";
  withfiles: any[] = [];

  user: any;
  fileFormValid: boolean = false;

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

  //dataSource!: MatTableDataSource<any>;
  dataSourceM = new BehaviorSubject<AbstractControl[]>([]);
  dataSourceF = new BehaviorSubject<AbstractControl[]>([]);
  dataSourceT = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = [
    "requirementid",
    "requirementname",
    "filename",
    "filetype",
    "selectFile",
  ];
  rowsM: FormArray = this.fb.array([]);
  rowsF: FormArray = this.fb.array([]);
  rowsT: FormArray = this.fb.array([]);
  formM: FormGroup = this.fb.group({ filedetails: this.rowsM });
  formF: FormGroup = this.fb.group({ filedetails: this.rowsF });
  formT: FormGroup = this.fb.group({ filedetails: this.rowsT });

  // ******************************************************************************
  //Wizard
  showWizard = false;
  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  HFormGroup3: FormGroup;
  // *******************************************************************************

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private tenderService: TenderService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private filesService: FilesService,
    private announcementService: AnnouncementService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "tender details") {
        this.tender = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";
        this.localStorageService.set("selectedTender", this.tender);
      } else {
        this.routeState = "";
      }
    }
  }

  ngOnInit(): void {
    //this.createWizard();
    this.tenderData = this.localStorageService.get("selectedTender");
    console.log("selectedTender: ", this.tenderData);

    this.user = this.tokenStorage.getUser();
    this.getTenderRequirementsViaId();
  }

  getTenderRequirementsViaId() {
    const params = new HttpParams().set("tender_id", this.tenderData.id);
    this.tenderService.getTenderRequirementsViaId(params).subscribe((res) => {
      this.requirementsData = res;
      console.log("Tender requirements =", res);

      this.categoriseRequirments();
    });
  }

  categoriseRequirments() {
    if (this.requirementsData) {
      this.reqLoading = false;
      this.requirementsData.mandatoryRequirements.forEach((element) => {
        if (element.type !== "file") {
          this.inputsM.push(element);
        } else if (element.type === "file") {
          this.fInputsM.push(element);
        }
      });
      this.requirementsData.financialRequirements.forEach((element) => {
        if (element.type !== "file") {
          this.inputsF.push(element);
        } else if (element.type === "file") {
          this.fInputsF.push(element);
        }
      });
      this.requirementsData.technicalRequirements.forEach((element) => {
        if (element.type !== "file") {
          this.inputsT.push(element);
        } else if (element.type === "file") {
          this.fInputsT.push(element);
        }
      });
      this.prepareForms();
    }
  }
       
  prepareForms() {
    this.generalResponse = {
      categorycode: this.tenderData.categorycode,
      tenderid: this.tenderData.id,
      tendertitle: this.tenderData.title,
      referenceid: this.tenderData.tenderNo,
      supplierid: this.user.id,
      suppliername: this.user.username,
      mandatoryrequirements: {
        withfiles: [],
        withoutfiles: [],
      },
      financialrequirements: {
        withfiles: [],
        withoutfiles: [],
      },

      technicalrequirements: {
        withfiles: [],
        withoutfiles: [],
      },
    };
    if (this.inputsM) {
      this.createNoFileFormM();
    }
    if (this.fInputsM) {
      this.createFileFormM();
    }
    if (this.inputsF) {
      this.createNoFileFormF();
    }
    if (this.fInputsF) {
      this.createFileFormF();
    }
    if (this.inputsT) {
      this.createNoFileFormT();
    }
    if (this.fInputsT) {
      this.createFileFormT();
    }
    console.log("No file M: ", this.inputsM);
    console.log("With file M: ", this.fInputsM);

    console.log("No file F: ", this.inputsF);
    console.log("With file F: ", this.fInputsF);

    console.log("No file T: ", this.inputsT);
    console.log("With file T: ", this.fInputsT);

    this.loading = false;
    this.showWizard = true;
  }

  createNoFileFormM() {
    const controls = {};
    this.inputsM.forEach((res) => {
      this.generalResponse.mandatoryrequirements.withoutfiles.push({
        requirementid: res.id,
        requirementname: res.name,
        response: "",
        supplierid: this.user.id,
      });
      if (res.type == "text") {
        this.textInputsM.push(res);
      }
      if (res.type == "select") {
        this.selectInputsM.push(res);
      }
      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === "required") {
          validationsArray.push(Validators.required);
        }
      });
      controls[res.name] = new FormControl([], validationsArray);
    });
    this.HFormGroup1 = new FormGroup(controls);
    console.log("HFormGroup1: ", this.HFormGroup1);
  }
  createFileFormM() {
    const controls = {};
    this.fInputsM.forEach((res) => {
      (this.currRequirementid = res.id),
        (this.currRequirementname = res.name),
        (this.currSupplierid = this.user.id),
        this.addFileRowM();
      if (res.type == "file") {
        this.fileInputsM.push(res);
      }
    });
  }
  addFileRowM(d?: TableData, noUpdate?: boolean) {
    this.isFileDataLoading = false;
    const row = this.fb.group({
      file: ["", Validators.required],
      filename: "Select file",
      filetype: "Select file",
      supplierid: this.currSupplierid,
      requirementid: this.currRequirementid,
      requirementname: this.currRequirementname,
    });
    this.rowsM.push(row);
    this.dataSourceM.next(this.rowsM.controls);
  }
  updateViewM() {
    this.dataSourceM.next(this.rowsM.controls);
  }

  createNoFileFormF() {
    const controls = {};
    this.inputsF.forEach((res) => {
      this.generalResponse.financialrequirements.withoutfiles.push({
        requirementid: res.id,
        requirementname: res.name,
        response: "",
        supplierid: this.user.id,
      });
      if (res.type == "text") {
        this.textInputsF.push(res);
      }
      if (res.type == "select") {
        this.selectInputsF.push(res);
      }
      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === "required") {
          validationsArray.push(Validators.required);
        }
      });
      controls[res.name] = new FormControl([], validationsArray);
    });
    this.HFormGroup2 = new FormGroup(controls);
  }
  createFileFormF() {
    this.fInputsF.forEach((res) => {
      (this.currRequirementid = res.id),
        (this.currRequirementname = res.name),
        (this.currSupplierid = this.user.id),
        this.addFileRowF();
      if (res.type == "file") {
        this.fileInputsF.push(res);
      }
    });
  }
  addFileRowF(d?: TableData, noUpdate?: boolean) {
    this.isFileDataLoading = false;
    const row = this.fb.group({
      file: ["", Validators.required],
      filename: "Select file",
      filetype: "Select file",
      supplierid: this.currSupplierid,
      requirementid: this.currRequirementid,
      requirementname: this.currRequirementname,
    });
    this.rowsF.push(row);
    this.dataSourceF.next(this.rowsF.controls);
  }
  updateViewF() {
    this.dataSourceF.next(this.rowsF.controls);
  }

  createNoFileFormT() {
    const controls = {};
    this.inputsT.forEach((res) => {
      this.generalResponse.technicalrequirements.withoutfiles.push({
        requirementid: res.id,
        requirementname: res.name,
        response: "",
        supplierid: this.user.id,
      });
      if (res.type == "text") {
        this.textInputsT.push(res);
      }
      if (res.type == "select") {
        this.selectInputsT.push(res);
      }
      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === "required") {
          validationsArray.push(Validators.required);
        }
      });
      controls[res.name] = new FormControl([], validationsArray);
    });
    this.HFormGroup3 = new FormGroup(controls);
  }
  createFileFormT() {
    const controls = {};
    this.fInputsT.forEach((res) => {
      (this.currRequirementid = res.id),
        (this.currRequirementname = res.name),
        (this.currSupplierid = this.user.id),
        this.addFileRowT();
      if (res.type == "file") {
        this.fileInputsT.push(res);
      }
    });
  }
  addFileRowT(d?: TableData, noUpdate?: boolean) {
    this.isFileDataLoading = false;
    const row = this.fb.group({
      file: ["", Validators.required],
      filename: "Select file",
      filetype: "Select file",
      supplierid: this.currSupplierid,
      requirementid: this.currRequirementid,
      requirementname: this.currRequirementname,
    });
    this.rowsT.push(row);
    this.dataSourceT.next(this.rowsT.controls);
  }
  updateViewT() {
    this.dataSourceT.next(this.rowsT.controls);
  }

  onSelectFile(files, selectedRow, form) {
    console.log("row: ", selectedRow.value);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);
        this.selectedFiles = res;
        this.currFile = this.selectedFiles[0].base64;
        this.currFilename = this.selectedFiles[0].name;
        this.currFiletype = this.selectedFiles[0].file.type;
        selectedRow.patchValue({
          file: this.currFile,
          filename: this.currFilename,
          filetype: this.currFiletype,
          supplierid: selectedRow.value.supplierid,
          requirementid: selectedRow.value.requirementid,
          requirementname: selectedRow.value.requirementname,
        });

        console.log("form.value: ", form.value.filedetails);

        // form.value.filedetails.forEach(element => {
        //   if (element.file) {
        //     this.fileFormValid = true
        //   }

        // });
      }
    });
  }

  submitApplicaation() {
    this.generalResponse.mandatoryrequirements.withfiles = this.rowsM.value;
    this.generalResponse.financialrequirements.withfiles = this.rowsF.value;
    this.generalResponse.technicalrequirements.withfiles = this.rowsT.value;

    if (this.inputsM && this.fInputsM) {
      const n = this.generalResponse.mandatoryrequirements.withoutfiles;
      const m = Object.values(this.HFormGroup1.value);
      n.forEach((val1, index) => {
        const val2 = m[index];
        val1.response = val2;
      });
    }
    if (this.inputsF && this.fInputsF) {
      const n = this.generalResponse.financialrequirements.withoutfiles;
      const m = Object.values(this.HFormGroup2.value);
      n.forEach((val1, index) => {
        const val2 = m[index];
        val1.response = val2;
      });
    }
    if (this.inputsT && this.fInputsT) {
      const n = this.generalResponse.technicalrequirements.withoutfiles;
      const m = Object.values(this.HFormGroup3.value);
      n.forEach((val1, index) => {
        const val2 = m[index];
        val1.response = val2;
      });
    }

    console.log("this.generalResponse: ", this.generalResponse);

    this.tenderService
      .postTenderApplication(this.generalResponse)
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
