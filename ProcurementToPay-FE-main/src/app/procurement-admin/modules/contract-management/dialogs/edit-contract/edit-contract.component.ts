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
import { ContractsService } from "src/app/procurement-admin/data/services/contracts.service";
import { ContractSuppliersLookupComponent } from "../contract-suppliers-lookup/contract-suppliers-lookup.component";
import { TendersLookUpComponent } from "../tenders-look-up/tenders-look-up.component";
import { TermsLookUpComponent } from "../terms-look-up/terms-look-up.component";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { TermsService } from "src/app/procurement-admin/data/services/terms.service";

@Component({
  selector: "app-edit-contract",
  templateUrl: "./edit-contract.component.html",
  styleUrls: ["./edit-contract.component.sass"],
})
export class EditContractComponent implements OnInit {
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
  routeState: any;
  selecContract: any;
  contractData: any;
  contractFiles: any[] = [];

  contractLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private announcementService: AnnouncementService,
    private location: Location,
    private tenderService: TenderService,
    private filesService: FilesService,
    private contractService: ContractsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private tenderPreperationService: TenderPreperationService,
    private termsService: TermsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.selecContract = this.routeState.selectedDetails
          ? JSON.parse(this.routeState.selectedDetails)
          : "";

        this.localStorageService.set("contract", this.selecContract);
      }
    }
  }

  ngOnInit(): void {
    this.contractData = this.localStorageService.get("contract");
    this.geContractById(this.contractData.id);

    this.user = this.tokenStorage.getUser();

    this.username = this.user.username;

    this.Form = this.createForm();
    this.onInitDynamicForm();
    console.log("this.contractData: ", this.contractData);
    this.getTenderCategories();
    this.selectedSup.push(parseInt(this.contractData.supplierId));
    this.selectedTermsIds = this.contractData.contractTermsConditionsList;
    this.getTenderById();
    this.getTermById();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: [this.contractData.title, [Validators.required]],
      contractType: [this.contractData.contractType, [Validators.required]],
      createdBy: [this.contractData.createdBy],
      duration: [this.contractData.duration, [Validators.required]],
      isVariations: new FormControl(this.contractData.isVariations.toString()),
      notificationPeriod: [
        this.contractData.notificationPeriod,
        [Validators.required],
      ],
      progress: [this.contractData.progress],
      rate: [this.contractData.rate, [Validators.required]],
      startDate: [this.contractData.startDate, [Validators.required]],
      closingDate: [this.contractData.closingDate, [Validators.required]],
      status: [this.contractData.status],
      supplierEmail: [this.contractData.supplierEmail],
      supplierId: [this.contractData.supplierId],
      supplierName: [this.contractData.supplierName],
      totalAmount: [this.contractData.totalAmount, [Validators.required]],
      description: [this.contractData.description, [Validators.required]],
      contractDocuments: new FormArray([]),
      tenderId: [this.contractData.tenderId],
      tender: [this.contractData.tender],
      contractTermsConditionsList: [
        this.contractData.contractTermsConditionsList,
      ],
      contractTermsConditionsListDetails: [
        this.contractData.contractTermsConditionsListDetails,
      ],
      modifiedBy:[this.username],
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
    this.t.removeAt(i);
  }
  onInitDynamicForm() {
    this.contractFiles = this.contractData.contractDocuments;
    for (let i = 0; i < this.contractFiles.length; i++) {
      this.onAddFeedField(this.contractFiles[i]);
    }
  }
  onAddFeedField(i: any) {
    this.t.push(
      (this.dyForm = this.fb.group({
        expholder: [""],
        id: [i.id],
        file: [i.file],
        fileType: [i.fileType],
        filename: [i.filename],
        supplierId: [i.supplierId],
      }))
    );
    console.log("dyForm: ", this.dyForm.value);
  }

  geContractById(id: any) {
    this.subscription = this.announcementService
      .getTenderCategoryById(id)
      .subscribe((res) => {
        this.contractData = res;
      });
  }

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
    this.contractLoading = true;
    this.subscription = this.contractService
      .updateContract(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Contract updated successfully!"
          );
          // this.router.navigateByUrl("/procurement-admin/announce/pending");
        },
        (err) => {
          console.log(err);
        }
      );
    this.contractLoading = false;
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
        this.selectedSup.push(parseInt(result.data[0].supplierid));
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

  getTenderById() {
    this.tenderPreperationService
      .getTenderById(this.contractData.tenderId)
      .subscribe(
        (result) => {
          let tenderDetails = result;

          //console.log("tenderDetails ", tenderDetails)
          this.Form.patchValue({
            //tenderId: result.data[0].id,
            tender: tenderDetails.title,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTermById() {
    let termDetails = [];

    this.contractData.contractTermsConditionsList.forEach((element) => {
      // this.selectedTermsIds.push(parseInt(element.contracttermsconditionsid));
      this.termsService
        .getTermById(element.contracttermsconditionsid)
        .subscribe(
          (result) => {
            termDetails.push(result.title);
            // console.log("result Terms: ", termDetails)
            this.Form.patchValue({
              contractTermsConditionsListDetails: termDetails,
            });
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  onCancel() {
    // this.router.navigate(["/procurement-admin/announce/pending"]);
  }
  back() {
    this.location.back();
  }
}
