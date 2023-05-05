import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, takeUntil } from "rxjs";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { TenderAdvertService } from "src/app/data/services/procurement-admin/tender-advert.service";
import { AddTenderComponent } from "src/app/procurement-admin/modules/tender/dialog/add-tender/add-tender.component";
import { PrequalifiedVendorDetailsComponent } from "src/app/procurement-admin/modules/tender/dialog/prequalified-vendor-details/prequalified-vendor-details.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-post-rfq",
  templateUrl: "./post-rfq.component.html",
  styleUrls: ["./post-rfq.component.sass"],
})
export class PostRfqComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "supplierid",
    "categorycode",
    "suppliername",
    // "prequalificationcode",
    "referenceid",
    //"prequalifiedon",
    "vendorDetails",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  selectFeedback: " ";
  billInfo: any;
  isLoading: boolean = true;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  centersList: any;
  selectedCenter: any;

  selected: boolean = false;
  selectedRows: any;

  prequalifiedVendors: any[] = [];
  selectedSuppliers: any[] = [];
  rfqCode: any;
  categoryCode: any;
  ids: any[] = [];

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private rfqsService: RfqsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddTenderComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private tenderAdvertService: TenderAdvertService
  ) {
    super();
    this.Data = data.data;

    console.log("Data ", data)

    this.rfqCode = this.Data.rfqCode;

    this.categoryCode = this.Data.categorycode;

    console.log("Category Code", this.categoryCode)
    
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
    console.log("RFQ CODE", this.rfqCode);

    console.log("CATEGORY CODE", this.categoryCode);
    
    this.getPrequalifiedVendorDetails(this.categoryCode);
  }

  getPrequalifiedVendorDetails(categorycode) {
    this.tenderAdvertService
      .getPrequalifiedSuppliersByCode(categorycode)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.prequalifiedVendors = result;

          console.log("Results ", result);

          if (this.prequalifiedVendors) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(
              this.prequalifiedVendors
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.prequalifiedVendors);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  vendorDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      PrequalifiedVendorDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  postRFQ() {

    console.log("Selected Suppliers", this.selectedSuppliers);

    this.ids = [];

    console.log("RFQ CODE", this.rfqCode)
    if (this.selectedSuppliers.length > 0) {
      this.selectedSuppliers.forEach((supplier) => {
        this.ids.push(Number(supplier.supplierid));
      });

      console.log("IDs ", this.ids)

      const params = new HttpParams()
        .set("rfcode", this.rfqCode)

      this.rfqsService
        .postRFQ(this.ids, params)
        .pipe(takeUntil(this.subject))
        .subscribe((result) => {
          console.log(result)
          this.snackbar.showNotification("snackbar-success", "RFQ posted successfully !");

          this.dialogRef.close();
        }, err => {
          console.log(err)

          this.dialogRef.close();
        });
    }else {
      this.snackbar.showNotification("snackbar-danger", "Please specify suppliers !")
    }

    // console.log("Selected Rows", this.selectedRows);

    // console.log("Suppliers Ids", this.ids)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //******************************************************************************************************
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

  checkboxActive() {
    this.selectedRows = this.selection.selected;

    this.selectedSuppliers = this.selectedRows;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTermsAndConditions() {
    this.dialogRef.close({ event: "close", data: this.selectedRows });

    console.log("Selected Rows", this.selectedRows);
  }
}
