import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormGroupName,
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
import { element } from "protractor";
import { takeUntil } from "rxjs";
import { TendersLookupComponent } from "src/app/commons/modules/lookups/components/tenders-lookup/tenders-lookup.component";
import { TermsAndConditionsComponent } from "src/app/commons/modules/lookups/components/terms-and-conditions/terms-and-conditions.component";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderAdvertService } from "src/app/data/services/procurement-admin/tender-advert.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderDetailsComponent } from "../../dialog/tender-details/tender-details.component";

@Component({
  selector: "app-generate-tender-advert",
  templateUrl: "./generate-tender-advert.component.html",
  styleUrls: ["./generate-tender-advert.component.sass"],
})
export class GenerateTenderAdvertComponent
  extends BaseComponent
  implements OnInit
{
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  submit;
  type;
  isLoading: boolean = true;
  selected: any;

  displayedColumns: string[] = [
    "id",
    "tenderNo",
    "tendertitle",
    "tenderDescripion",
    "bidType",
    "evaluationcriteria",
    "tendertype",
    "postedTime",
    "viewDetails",
    "removeTender",
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
  generateTenderAdvertForm: FormGroup;
  tendersForm: FormGroup;
  tenderAdvertAdditionalDetailsForm: FormGroup;
  startDate = new Date();
  selectedNeedCategory: any;
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
  hasBidFee: boolean = false;
  enableSubmit: boolean = false;
  tenders: any[] = [];

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  tenderitems: any[] = [];
  typesOfTender: string[] = ["Open", "Closed"];
  tenderTypeSpecified: boolean = false;
  tenderType: string;

  dataSource2!: MatTableDataSource<any>;
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
    private tenderPreperationService: TenderPreperationService,
    private tenderAdvertService: TenderAdvertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;

    this.generateTenderAdvertForm = this.createGenerateTenderAdvertForm();

    this.tenderAdvertAdditionalDetailsForm =
      this.createTenderAdditionalDetailsForm();
  }

  createGenerateTenderAdvertForm(): FormGroup {
    return this.fb.group({
      noticeDescription: ["", [Validators.required]],
      noticeTitle: ["", [Validators.required]],
      websiteLink: ["", [Validators.required]],
      postedBy: [this.user],
      advertType: ["", [Validators.required]],
      tenders: new FormArray([]),
    });
  }

  createTenderAdditionalDetailsForm(): FormGroup {
    return this.fb.group({
      noticeDescription: ["", [Validators.required]],
      noticeTitle: ["", [Validators.required]],
      selectTenders: ["", [Validators.required]],
      advertType: ["", [Validators.required]],
      websiteLink: ["", [Validators.required]],
    });
  }

  get f() {
    return this.generateTenderAdvertForm.controls;
  }
  get t() {
    return this.f.tenders as FormArray;
  }

  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  selectTenderAdvertType(event: any){
    this.tenderTypeSpecified = true;



    this.t.reset();

    this.tenderAdvertAdditionalDetailsForm.patchValue({
      selectTenders: ""
    })

    if(this.tenders.length > 0){
      this.isLoading = true
     
      this.dataSource.data = []

      this.tenders = [];

      
    }

    this.tenderType = event.value;

    
  }

  tendersLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: this.tenderType,
    };

    const dialogRef = this.dialog.open(TendersLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Result ", result);

      this.tenders = result.data;

      if (this.tenders.length > 0) {
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<any>(this.tenders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.tenderAdvertAdditionalDetailsForm.patchValue({
          selectTenders: `${this.tenders.length} - Tenders selected`,
        });

        this.tenders.forEach((tender) => {
          this.t.push(
            (this.tendersForm = this.fb.group({
              closingDate: [tender.closingDate],
              // id: [tender.id],
              tenderDescripion: [tender.tenderDescription],
              tenderNo: [tender.tenderNo],
              tendertitle: [tender.title],
            }))
          );
        });
      }
    });
  }

  needDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(TenderDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      // this.getTenders();
    });
  }

  deleteTender(i, row){
    const index = i;

    const id = row.id;

    const foundIndex = this.tenders.findIndex((x) => x.id === id);

    this.tenders.splice(foundIndex, 1);

    this.onRemoveField(index)

    this.tenderAdvertAdditionalDetailsForm.patchValue({
      selectTenders: `${this.tenders.length} - Tenders selected`,
    });

    this.dataSource = new MatTableDataSource<any>(this.tenders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource
    this.showNotification(
      "snackbar-danger",
      "Delete Record Successfully...!!!",
      "bottom",
      "center"
    );
  }

  checkboxActive() {
    this.selectedRows = this.selection.selected;
    console.log("Selected Rows", this.selectedRows);
  }

  prepareTender() {
    this.generateTenderAdvertForm.patchValue({
      // companyName: this.tenderAdvertAdditionalDetailsForm.value.companyName,
      noticeDescription:
        this.tenderAdvertAdditionalDetailsForm.value.noticeDescription,
      noticeTitle: this.tenderAdvertAdditionalDetailsForm.value.noticeTitle,
      websiteLink: this.tenderAdvertAdditionalDetailsForm.value.websiteLink,
    });

    console.log("Tender Form", this.generateTenderAdvertForm.value);

    this.tenderAdvertService
      .addTenderAdvert(this.generateTenderAdvertForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log(result);

          this.snackbar.showNotification(
            "snackbar-success",
            "Tender notice advertisement generated successfully !"
          );

          this.router.navigate([
            "/procurement-admin/tender/all-tender-adverts",
          ]);
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

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
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
