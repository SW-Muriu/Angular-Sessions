import { SelectionModel } from "@angular/cdk/collections";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BehaviorSubject, takeUntil } from "rxjs";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TermsAndConditionsComponent } from "src/app/commons/modules/lookups/components/terms-and-conditions/terms-and-conditions.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {
  FilesService,
  SelectedFiles,
} from "src/app/suppliers/data/fileconversion/files.service";
import Swal from "sweetalert2";
import { TenderFinancialRequirementsComponent } from "../../dialog/tender-financial-requirements/tender-financial-requirements.component";
import { TenderMandatoryRequirementsComponent } from "../../dialog/tender-mandatory-requirements/tender-mandatory-requirements.component";
import { TenderTechnicalRequirementsComponent } from "../../dialog/tender-technical-requirements/tender-technical-requirements.component";

@Component({
  selector: "app-prepare-tender",
  templateUrl: "./prepare-tender.component.html",
  styleUrls: ["./prepare-tender.component.scss"],
})
export class PrepareTenderComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  submit;
  type;
  isLoading: boolean;
  selected: any;

  displayedColumns: string[] = [
    "select",
    "item_name",
    "department",
    "item_quantity",
    "unit_price",
    "total_price",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild("paginatorCostCenters") paginatorCCs: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  dataSourcePointing!: MatTableDataSource<any>;
  @ViewChild("paginatorPointingDetails") paginatorPointing: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPointing!: MatSort;

  dyForm: FormGroup;
  tenderForm: FormGroup;
  tendeAdditionalDetailsForm: FormGroup;
  termsAndConditionsForm: FormGroup;
  mandatoryRequirementsForm: FormGroup;
  technicalRequirementsForm: FormGroup;
  financialRequirementsForm: FormGroup;
  startDate = new Date();
  items: any[] = [];
  categories: any[] = [];
  needs: any[] = [];
  selectedRows: any[] = [];
  needIds: any[] = [];
  user: any;
  ccSelected: number = 0;
  selectedNeedIds: any[] = [];
  tenderNeeds: any[] = [];
  termsAndConditions: any = [];
  selectedNeeds: any[] = [];
  hasBidFee: boolean = false;
  enableSubmit: boolean = false;
  categorySelected: boolean = false;
  selectedCategory: string = "";

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;
  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  tenderitems: any[] = [];
  typesOfTender: string[] = ["Open", "Closed"];
  evaluationCreteria: string[] = [
    "Determination of Responsiveness",
    "Detailed Technical Examination",
    "Financial Evaluation",
    "Combination of Technical, Tender Sums Comparison and Financial Store",
    "Post Qualification: Due Diligence",
  ];
  procurementTypes: string[] = [
    "Strategic Procurement",
    "Supportive Procurement",
    "Commercial Procurement",
    "Clerical Procurement",
  ];
  bidTypes: string[] = ["Auction Bids", "Online Bids", "Sealed Bids"];

  displayedColumnss: string[] = [
    "accountNo",
    "accountName",
    "amount",
    "parttranstype",
    "narration",
    "actions",
  ];

  dataSource2!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("paginatorLegal") paginatorLegal: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private tenderCategoriesService: TenderCategoriesService,
    private tenderPreperationService: TenderPreperationService,
    private filesService: FilesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;

    this.getTendercategories();

    this.getTermsAndConditions();

    this.tenderForm = this.createTenderForm();

    this.tendeAdditionalDetailsForm = this.createTenderAdditionalDetailsForm();
  }

  createTenderForm(): FormGroup {
    return this.fb.group({
      bidFee: [""],
      budget: [""],
      communicationMode: [""],
      postedBy: [this.user],
      tenderDescription: [""],
      bidType: [""],
      categorycode: [""],
      evaluationcriteria: [""],
      procurementtype: [""],
      procuringentity: [""],
      title: [""],
      withBidFee: [""],
      tendertype: [""],
      tenderDocuments: new FormArray([]),
      tenderParticulars: new FormArray([]),
      termsandCondditions: new FormArray([]),
      mandatoryReqsList: new FormArray([]),
      technicalReqsList: new FormArray([]),
      financialReqsList: new FormArray([]),
    });
  }

  createTenderAdditionalDetailsForm(): FormGroup {
    return this.fb.group({
      bidFee: ["", [Validators.required]],
      budget: ["", [Validators.required]],
      communicationMode: ["", [Validators.required]],
      tenderDescription: ["", [Validators.required]],
      title: ["", [Validators.required]],
      withBidFee: ["No", [Validators.required]],
      tendertype: ["", [Validators.required]],
      bidType: ["", [Validators.required]],
      categorycode: ["", [Validators.required]],
      evaluationcriteria: ["", [Validators.required]],
      procurementtype: ["", [Validators.required]],
      procuringentity: ["", [Validators.required]],
      termsAndConditions: ["", [Validators.required]],
      mandatoryRequirements: ["", [Validators.required]],
      technicalRequirements: ["", [Validators.required]],
      financialRequirements: ["", [Validators.required]],
    });
  }

  get f() {
    return this.tenderForm.controls;
  }
  get t() {
    return this.f.tenderParticulars as FormArray;
  }

  get termsAndConditionsFormControl() {
    return this.f.termsandCondditions as FormArray;
  }

  get tenderDocuments() {
    return this.f.tenderDocuments as FormArray;
  }

  get mandatoryRequirements() {
    return this.f.mandatoryReqsList as FormArray;
  }

  get technicalRequirements() {
    return this.f.technicalReqsList as FormArray;
  }

  get financialRequirementsList() {
    return this.f.financialReqsList as FormArray;
  }

  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  getTendercategories() {
    this.tenderCategoriesService
      .listAllCapexTendercategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log("Tender categories", result);

          this.categories = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSelectedNeedCategories(event: any) {
    if (!this.selectedCategory) {
      this.selectedCategory = event.value;

      this.getNeedsByCategory(this.selectedCategory);
    } else {
      Swal.fire({
        title: "Overwrite category?",
        text: "A tender can only be generated from a single category !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Overwrite category !",
      }).then((result) => {
        if (result.isConfirmed) {
          this.t.clear();

          this.selectedCategory = event.value;

          this.getNeedsByCategory(this.selectedCategory);
        }
      });
    }
    if (!this.selectedCategory) {
      console.log(123);
    } else {
      console.log("Selected category", this.selectedCategory);
    }

    console.log("Selected expenses: ", this.selectedCategory);
  }

  includeBidFee(event: any) {
    if (event.value == "Yes") {
      this.hasBidFee = true;
    } else if (event.value == "No") {
      this.hasBidFee = false;
    }
  }

  getTenderNeeds(categoryIds) {
    console.log("Need Ids ", categoryIds);
    this.tenderPreperationService
      .getTenderNeeds(categoryIds)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log("Tender Needs", result);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getNeedsByCategory(categoryName) {
    this.dataSource = null;

    this.tenderPreperationService
      .getNeedsPercategory(categoryName)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log("Tender categories", result);
          this.needs = result;

          this.dataSource = new MatTableDataSource<any>(this.needs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);

          this.snackbar.showNotification(
            "snackbar-danger",
            "No more approved items in this category"
          );
        }
      );
  }

  refresh() {
    this.getNeedsByCategory(this.selectedCategory);
  }

  getTermsAndConditions() {
    this.tenderPreperationService
      .getTermsAndConditions()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log("Terms And Conditions", result);

          this.termsAndConditions = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  generateTenderItem() {
    let approximateUnitPrice = 0;
    let approximateTotalPrice = 0;
    let totalQuantity = 0;
    let itemCount = this.selectedNeeds.length;
    this.selectedNeeds.forEach((need) => {
      this.needIds.push(need.id);
      console.log(Number(need.item_quantity));

      approximateUnitPrice = approximateUnitPrice + Number(need.unit_price);

      approximateTotalPrice = approximateTotalPrice + Number(need.total_price);

      totalQuantity = totalQuantity + Number(need.item_quantity);
    });

    console.log("Item Quantity", totalQuantity);

    let estimateUnitPrice = (approximateUnitPrice / itemCount).toFixed(2);

    let estimateTotalPrice = (
      Number(estimateUnitPrice) * totalQuantity
    ).toFixed(2);

    console.log("Unit Price", estimateUnitPrice);

    console.log("Total Price", estimateTotalPrice);

    console.log("Need IDs", this.needIds);

    this.t.push(
      (this.dyForm = this.fb.group({
        itemName: [""],
        itemQuantity: [totalQuantity],
        itemDescription: [""],
        totalPrice: [estimateTotalPrice],
        unitPrice: [estimateUnitPrice],
      }))
    );

    // this.getNeedsByCategory(this.selectedNeedCategory);

    if (this.t.length > 0) {
      this.enableSubmit = true;
    }
  }

  termsAndConditionsLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      TermsAndConditionsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Result ", result);

      let selectedTermsAndConditions: any[];

      selectedTermsAndConditions = result.data;

      if (this.termsAndConditions) {
        this.tendeAdditionalDetailsForm.patchValue({
          termsAndConditions: `${selectedTermsAndConditions.length} terms and conditions selected`,
        });
        selectedTermsAndConditions.forEach((term) => {
          this.termsAndConditionsFormControl.push(
            (this.termsAndConditionsForm = this.fb.group({
              description: [term.description],
              subTitle: [term.subTitle],
              title: [term.title],
            }))
          );
        });
      }
    });
  }

  financialRequirements() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      TenderFinancialRequirementsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Financial Requirements ", result);

      let selectedFinancialRequirements: any[];

      selectedFinancialRequirements = result.data;

      if (selectedFinancialRequirements) {
        this.tendeAdditionalDetailsForm.patchValue({
          financialRequirements: `${selectedFinancialRequirements.length} financial requirements selected`,
        });
        selectedFinancialRequirements.forEach((requirement) => {
          this.financialRequirementsList.push(
            (this.financialRequirementsForm = this.fb.group({
              financialRequirementId: [requirement.id],
            }))
          );
        });
      }
    });
  }

  tenderTechnicalRequirements() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      TenderTechnicalRequirementsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Technical Requirements ", result);

      let selectedTechnicalRequirements: any[];

      selectedTechnicalRequirements = result.data;

      if (selectedTechnicalRequirements) {
        this.tendeAdditionalDetailsForm.patchValue({
          technicalRequirements: `${selectedTechnicalRequirements.length} technical requirements selected`,
        });
        selectedTechnicalRequirements.forEach((requirement) => {
          this.technicalRequirements.push(
            (this.technicalRequirementsForm = this.fb.group({
              technicalRequirementId: [requirement.id],
            }))
          );
        });
      }
    });
  }

  tenderMandatoryRequirements() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      test: "",
    };

    const dialogRef = this.dialog.open(
      TenderMandatoryRequirementsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Mandatory Requirements ", result);

      let selectedMandatoryRequirements: any[];

      selectedMandatoryRequirements = result.data;

      if (selectedMandatoryRequirements) {
        this.tendeAdditionalDetailsForm.patchValue({
          mandatoryRequirements: `${selectedMandatoryRequirements.length} mandatory requirements selected`,
        });
        selectedMandatoryRequirements.forEach((requirement) => {
          this.mandatoryRequirements.push(
            (this.mandatoryRequirementsForm = this.fb.group({
              mandatoryRequirementId: [requirement.id],
            }))
          );
        });
      }
    });
  }

  checkboxActive() {
    this.selectedRows = this.selection.selected;
    console.log("Selected Rows", this.selectedRows);

    this.selectedNeeds = this.selectedRows;

    console.log("Selected Needs", this.selectedNeeds);
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
          this.tenderDocuments.push(
            (this.dyForm = this.fb.group({
              filename: selectedFile.name,
              file: selectedFile.base64,
              fileType:selectedFile.file.type,
            }))
          );
        });
      }
    });
  }

  prepareTender() {
    console.log(
      "Tender Additional Details Form",
      this.tendeAdditionalDetailsForm.value
    );

    this.tenderForm.patchValue({
      bidFee: this.tendeAdditionalDetailsForm.value.bidFee,
      budget: this.tendeAdditionalDetailsForm.value.budget,
      catagory: this.tendeAdditionalDetailsForm.value.catagory,
      closingDate: this.tendeAdditionalDetailsForm.value.closingDate,
      communicationMode:
        this.tendeAdditionalDetailsForm.value.communicationMode,
      postedBy: this.user,
      postedTime: this.tendeAdditionalDetailsForm.value.postedTime,
      startDate: this.tendeAdditionalDetailsForm.value.startDate,
      tenderDescription:
        this.tendeAdditionalDetailsForm.value.tenderDescription,
      title: this.tendeAdditionalDetailsForm.value.title,
      withBidFee: this.tendeAdditionalDetailsForm.value.withBidFee,
      tendertype: this.tendeAdditionalDetailsForm.value.tendertype,
      bidType: this.tendeAdditionalDetailsForm.value.bidType,
      categorycode: this.tendeAdditionalDetailsForm.value.categorycode,
      evaluationcriteria: this.tendeAdditionalDetailsForm.value.evaluationcriteria,
      procurementtype: this.tendeAdditionalDetailsForm.value.procurementtype,
      procuringentity: this.tendeAdditionalDetailsForm.value.procuringentity,
    });

    console.log("Tender Form", this.tenderForm.value);

    this.tenderPreperationService.addTender(this.tenderForm.value).subscribe(
      (result) => {
        console.log(result);

        this.snackbar.showNotification(
          "snackbar-success",
          "Tender created successfully !"
        );

        console.log("Need Id's", this.needIds);

        this.getTenderNeeds(this.needIds);

        // this.router.navigate(["/procurement-admin/tender/pending-tenders"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.tenderitems.findIndex((d) => d === item);

      this.refreshTable();
      this.selection = new SelectionModel<any>(true, []);
    });
    this.showNotification(
      "snackbar-danger",
      totalSelect + " Record Delete Successfully...!!!",
      "bottom",
      "center"
    );
  }

  // Even distribution calculation

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
