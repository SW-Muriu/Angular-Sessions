import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription, takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Location } from "@angular/common";
import { TenderService } from "src/app/procurement-admin/data/services/tenders.service";
import {
  FilesService,
  SelectedFiles,
} from "src/app/suppliers/data/fileconversion/files.service";
import { ContractSuppliersLookupComponent } from "../dialogs/contract-suppliers-lookup/contract-suppliers-lookup.component";
import { TendersLookUpComponent } from "../dialogs/tenders-look-up/tenders-look-up.component";
import { TermsLookUpComponent } from "../dialogs/terms-look-up/terms-look-up.component";
import { ContractsService } from "src/app/procurement-admin/data/services/contracts.service";

@Component({
  selector: "app-add-contract",
  templateUrl: "./add-contract.component.html",
  styleUrls: ["./add-contract.component.scss"],
})
export class AddContractComponent implements OnInit {
  Form: FormGroup;
  dyForm: FormGroup;

  types: string[] = ["Goods", "Services"];
  username: string;
  user: any;

  announcementloading: boolean = false;

  subscription!: Subscription;
  tenderCategories: any;
  tenderCategory: any;

  currSupplierid: number;
  currFile: string;
  currFilename: any;
  currFiletype: any;
  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);
  isLoading: boolean = false;

  inputList: any[] = [{ name: "Text" }, { name: "Select" }, { name: "File" }];
  selectedSup: any[] = [];
  selectedTender: any[] = [];

  selectedTermsIds: any[] = [];
  selectedTermsTitles: any[] = [];
  contractTypes: any[] = [
    { name: "Unilateral Contract" },
    { name: "Bilateral Contract" },
  ];
  days: number;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private announcementService: AnnouncementService,
    private location: Location,
    private tenderService: TenderService,
    private filesService: FilesService,
    private contractService: ContractsService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.username = this.user.username;

    this.Form = this.createForm();

    this.Form.patchValue({
      postedby: this.username,
    });

    this.getTenderCategories();
  }

  //{
  //   "closingDate": "2022-09-07T07:26:12.424Z",
  //   "contractDocuments": [
  //     {
  //       "contractId": "string",
  //       "file": "string",
  //       "fileType": "string",
  //       "filename": "string",
  //       "id": 0,
  //       "supplierId": "string"
  //     }
  //   ],
  //   "contractTermsConditionsList": [
  //     {
  //       "description": "string",
  //       "id": 0,
  //       "subTitle": "string",
  //       "title": "string"
  //     }
  //   ],
  //   "contractType": "string",
  //   "createdBy": "string",
  //   "createdTime": "2022-09-07T07:26:12.424Z",
  //   "deletedBy": "string",
  //   "deletedFlag": "string",
  //   "deletedTime": "2022-09-07T07:26:12.424Z",
  //   "duration": "string",
  //   "id": 0,
  //   "isVariations": true,
  //   "modifiedBy": "string",
  //   "modifiedTime": "string",
  //   "notificationPeriod": "string",
  //   "progress": "string",
  //   "rate": "string",
  //   "startDate": "2022-09-07T07:26:12.424Z",
  //   "status": "string",
  //   "statusReason": "string",
  //   "supplierEmail": "string",
  //   "supplierId": "string",
  //   "supplierName": "string",
  //   "tender": {},
  //   "timeRemaining": "string",
  //   "title": "string",
  //   "totalAmount": "string",
  //   "variations": [
  //     {
  //       "description": "string",
  //       "id": 0,
  //       "reason": "string"
  //     }
  //   ],
  //   "verifiedAt": "2022-09-07T07:26:12.424Z",
  //   "verifiedBy": "string"
  // }
  //   {
  //
  //     "contractType": "",
  //
  //
  //
  //
  //     "progress": "",
  //     "rate": "Eos ipsa cumque pos",
  //
  //     "status": "Pending",
  //     "supplierEmail": "dnyiri9@gmail.com",
  //     "supplierId": "7",
  //     "supplierName": "dnyiri9@gmail.com",
  //     "totalAmount": "Sequi non sit volup",
  //     "description": "Eiusmod in aut volup",
  //     "contractTermsConditionsList": "",
  //     "contractDocuments": [
  //         {
  //             "file": "=",
  //             "fileType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //             "filename": "Technical_System2System.docx"
  //         }
  //     ]
  // }
  createForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required]],
      contractType: ["", [Validators.required]],
      createdBy: [this.username],
      duration: ["", [Validators.required]],
      isVariations: new FormControl("true", Validators.required),
      notificationPeriod: ["", [Validators.required]],
      progress: ["Not Started"],
      rate: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      closingDate: ["", [Validators.required]],
      status: ["Pending"],
      supplierEmail: [""],
      supplierId: [""],
      supplierName: [""],
      totalAmount: ["", [Validators.required]],
      description: ["", [Validators.required]],
      contractDocuments: new FormArray([]),
      tenderId: [""],
      tender: [""],
      contractTermsConditionsList: [""],
      contractTermsConditionsListDetails: [""],

      // "contractDocuments": [
      //   {
      //     "contractId": "string",
      //     "file": "string",
      //     "fileType": "string",
      //     "filename": "string",
      //     "id": 0,
      //     "supplierId": "string"
      //   }
      // ],
      // "contractTermsConditionsList": [
      //   {
      //     "description": "string",
      //     "id": 0,
      //     "subTitle": "string",
      //     "title": "string"
      //   }
      // ],
    });
  }
  get f() {
    return this.Form.controls;
  }
  get t() {
    return this.f.contractDocuments as FormArray;
  }
  getTenderCategories() {
    this.subscription = this.tenderService.getTenders().subscribe((res) => {
      this.tenderCategories = res;
    });
  }
  supplierSelected() {
    if (this.Form.value.supplierName) {
      this.onAddField();
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please select supplier!"
      );
    }
  }
  onSelectFile(files, index) {
    console.log("Index: ", index);
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

        this.t.at(index).patchValue({
          fileType: this.currFiletype,
          filename: this.currFilename,
          supplierId: this.currSupplierid,
          file: this.currFile,
        });
      }
    });
  }
  onAddField() {
    //console.log("dyForm: ", this.dyForm.value.inputtype)
    this.t.push(
      (this.dyForm = this.fb.group({
        file: [""],
        fileType: [""],
        filename: [""],
        supplierId: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    if (i > 0) {
      this.t.removeAt(i);
    }
  }
  // getInputType(event: any) {
  //   console.log("event = ", event.value);

  //   this.dyForm.patchValue({
  //     inputType: event.value,
  //     type: event.value.toLowerCase(),
  //   });
  // }
  // getRequirementName(event: Event) {
  //   var stringToConvert = (event.target as HTMLInputElement).value;
  //   var reqNoSpace = stringToConvert.replace(/\s/g, "").toLowerCase();
  //   this.dyForm.patchValue({
  //     label: stringToConvert,
  //     name: reqNoSpace,
  //   });
  // }

  getAnnouncements(event: any) {
    console.log("event", event.value);
    this.subscription = this.announcementService
      .getTenderCategoryById(event.value)
      .subscribe((res) => {
        this.tenderCategory = res;
        this.Form.patchValue({
          category: this.tenderCategory.name,
          categorycode: this.tenderCategory.code,
        });
      });
  }
  // startDate: ["", [Validators.required]],
  // closingDate: ["", [Validators.required]],

  getDiffDays() {
    let startDate = new Date(this.Form.value.startDate);
    let endDate = new Date(this.Form.value.closingDate);

    var Time = endDate.getTime() - startDate.getTime();
    this.days = Time / (1000 * 3600 * 24);

    this.Form.patchValue({
      duration: this.days,
    });
  }

  onSubmit() {
    console.log("FORM :", this.Form.value);
    this.subscription = this.contractService
      .addContract(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Contract uploaded successfully!"
          );

          // this.router.navigateByUrl("/procurement-admin/announce/pending");
        },
        (err) => {
          console.log(err);
        }
      );
  }

  suppliersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      action: "view suppliers",
      data: "test data",
      selected: this.selectedSup,
    };

    const dialogRef = this.dialog.open(
      ContractSuppliersLookupComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        this.currSupplierid = parseInt(result.data[0].supplierid);
        this.selectedSup = [];
        this.selectedSup.push( parseInt(result.data[0].supplierid));
        console.log("this.selectedSup: ", this.selectedSup);
        this.Form.patchValue({
          supplierEmail: result.data[0].emailaddress,
          supplierId: parseInt(result.data[0].supplierid),
          supplierName: result.data[0].emailaddress,
        });
      }
    });
  }
  tendersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "lookup tenders",
      selected: this.selectedTender,
    };

    const dialogRef = this.dialog.open(TendersLookUpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        this.selectedTender = [];
        this.selectedTender.push(result.data[0].id);
        console.log("this.selectedTender: ", this.selectedTender);
        this.Form.patchValue({
          tenderId: result.data[0].id,
          tender: result.data[0].title,
        });
      }
    });
  }
  termsLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "terms tenders",
      selected: this.selectedTermsIds,
    };

    const dialogRef = this.dialog.open(TermsLookUpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        this.selectedTermsIds = [];
        this.selectedTermsTitles = [];
        result.data.forEach((element) => {
          this.selectedTermsIds.push({ contracttermsconditionsid: element.id });
          this.selectedTermsTitles.push(element.title);
        });

        console.log("result.data: ", result.data);
        this.Form.patchValue({
          contractTermsConditionsList: this.selectedTermsIds,
          contractTermsConditionsListDetails: this.selectedTermsTitles,
        });
      }
    });
  }
  onCancel() {
    // this.router.navigate(["/procurement-admin/announce/pending"]);
  }
  back() {
    this.location.back();
  }
}
