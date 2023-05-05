import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
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
import { takeUntil } from "rxjs";
import { TermsAndConditionsComponent } from "src/app/commons/modules/lookups/components/terms-and-conditions/terms-and-conditions.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TaxService } from "src/app/data/services/admin/tax.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-create-rfq",
  templateUrl: "./create-rfq.component.html",
  styleUrls: ["./create-rfq.component.sass"],
})
export class CreateRfqComponent extends BaseComponent implements OnInit {
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
  hasBidFee: boolean = true;
  enableSubmit: boolean = false;
  categorySelected: boolean = false;
  selectedCategory: string = "";

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  tenderitems: any[] = [];
  typesOfTender: string[] = ["Open", "Closed", "Negotiated"];
  taxes: any[] = [];
  netAmount: number = 0;
  grossAmount: number = 0;

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
    private rfqService: RfqsService,
    private tenderPreperationService: TenderPreperationService,
    private taxService: TaxService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;

    this.getTendercategories();

    this.getTermsAndConditions();

    this.getTaxes();

    this.tenderForm = this.createTenderForm();

    this.tendeAdditionalDetailsForm = this.createTenderAdditionalDetailsForm();
  }

  createTenderForm(): FormGroup {
    return this.fb.group({
      bidFee: [""],
      categorycode: [""],
      grossBudget: [""],
      netBudget: [""],
      highestQuote: [""],
      lowestQuote: [""],
      projectDeadline: [""],
      responseDeadline: [""],
      title: [""],
      postedBy: [""],
      particulars: new FormArray([]),
    });
  }

  createTenderAdditionalDetailsForm(): FormGroup {
    return this.fb.group({
      bidFee: [""],
      categorycode: [""],
      grossBudget: [""],
      netBudget: [""],
      highestQuote: [""],
      lowestQuote: [""],
      projectDeadline: [""],
      responseDeadline: [""],
      title: [""],
    });
  }

  get f() {
    return this.tenderForm.controls;
  }
  get t() {
    return this.f.particulars as FormArray;
  }

  get termsAndConditionsFormControl() {
    return this.f.termsandCondditions as FormArray;
  }

  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  getTaxes() {
    this.taxService
      .getTaxes()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.taxes = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTendercategories() {
    this.tenderCategoriesService
      .listAllOpexCategories()
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

          // Swal.fire("Overwrite!", "Tender items overwritten.", "success");
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

      console.log("NEED ", need);
      console.log("Quantity ", Number(need.item_quantity));

      approximateUnitPrice = approximateUnitPrice + Number(need.unit_price);

      approximateTotalPrice = approximateTotalPrice + Number(need.total_price);

      totalQuantity = totalQuantity + Number(need.item_quantity);
    });

    let estimateUnitPrice = (approximateUnitPrice / itemCount).toFixed(2);

    let estimateTotalPrice = (
      Number(estimateUnitPrice) * totalQuantity
    ).toFixed(2);

    console.log("Unit Price", estimateUnitPrice);

    console.log("Total Price", estimateTotalPrice);

    console.log("Need IDs", this.needIds);

    this.t.push(
      (this.dyForm = this.fb.group({
        item: [""],
        quantity: [totalQuantity],
        description: [""],
        taxRate: [""],
        taxAmount: [""],
        totalPrice: [estimateTotalPrice],
        unitPrice: [estimateUnitPrice],
      }))
    );

    if (this.t.length > 0) {
      this.enableSubmit = true;
    }
  }

  selectTax(event: any, i: any) {
    let form = this.t.at(i);

    this.dyForm == this.t.at(i);

    // console.log("Dy Form ", this.dyForm.value);

    let taxAmount = 0;
    let taxRate = Number(event.value);
    let totalPrice = Number(this.dyForm.value.totalPrice);

    taxAmount = (taxRate / 100) * totalPrice;

    totalPrice = totalPrice + taxAmount;

    this.dyForm.patchValue({
      taxAmount: taxAmount,
      totalPrice: totalPrice,
    });

    this.calculatePrices();
  }

  calculatePrices() {
    this.netAmount = 0;
    this.grossAmount = 0;

    for (let i = 0; i < this.t.length; i++) {
      let form = this.t.at(i);

      let quantity = form.value.quantity;

      let unitPrice = form.value.unitPrice;

      let price = Number(quantity) * Number(unitPrice);

      let totalPrice = form.value.totalPrice;

      this.netAmount += price;

      this.grossAmount += totalPrice;

      console.log("Price ", price)
    }

    console.log("Net Amount", this.netAmount);

    console.log("Gross Amount", this.grossAmount);

    this.tendeAdditionalDetailsForm.patchValue({
      grossBudget: this.grossAmount,
      netBudget: this.netAmount,
    });
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
          tenderNo: "Terms Specified",
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

  checkboxActive() {
    this.selectedRows = this.selection.selected;
    console.log("Selected Rows", this.selectedRows);

    this.selectedNeeds = this.selectedRows;

    console.log("Selected Needs", this.selectedNeeds);
  }

  prepareTender() {
    console.log(
      "Tender Additional Details Form",
      this.tendeAdditionalDetailsForm.value
    );

    this.tenderForm.patchValue({
      bidFee: this.tendeAdditionalDetailsForm.value.bidFee,
      categorycode: this.tendeAdditionalDetailsForm.value.categorycode,
      grossBudget: this.tendeAdditionalDetailsForm.value.grossBudget,
      netBudget: this.tendeAdditionalDetailsForm.value.netBudget,
      highestQuote: this.tendeAdditionalDetailsForm.value.highestQuote,
      lowestQuote: this.tendeAdditionalDetailsForm.value.lowestQuote,
      projectDeadline: this.tendeAdditionalDetailsForm.value.projectDeadline,
      responseDeadline: this.tendeAdditionalDetailsForm.value.responseDeadline,
      title: this.tendeAdditionalDetailsForm.value.title,
      postedBy: this.user,
    });

    console.log("RFQ Form", this.tenderForm.value);

    this.rfqService.createRFQ(this.tenderForm.value).subscribe(
      (result) => {
        console.log(result);

        this.snackbar.showNotification(
          "snackbar-success",
          "RFQ created successfully !"
        );

        console.log("Need Id's", this.needIds);

        this.getTenderNeeds(this.needIds);

        // this.router.navigate(["procurement-admin/rfqs/pending-rfqs"]);
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
