import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/admin/data/services/localstorage.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { AddTenderComponent } from 'src/app/procurement-admin/modules/tender/dialog/add-tender/add-tender.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-tenders-lookup',
  templateUrl: './tenders-lookup.component.html',
  styleUrls: ['./tenders-lookup.component.sass']
})
export class TendersLookupComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "tenderNo",
    "title",
    "tendertype",
    "postedTime",
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

  totalForEach: number = 0;
  taxForEach: number = 0;
  grossAmt: number;

  selectedEvenly: boolean = true;
  selectedCustom: boolean = false;

  termsAndConditions: any[] = [];
  selectedTermsAndConditions: any[] = [];
  tenderType: string;


  constructor(
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddTenderComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private tenderPreperationService: TenderPreperationService
  ) {
    super();
    this.Data = data.data;

    this.tenderType = data.data

    console.log("Tender type ", this.Data)
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
    this.getTenders(this.tenderType);
  }

  getTenders(tenderType) {
    this.tenderPreperationService
      .fetchTenderByTenderType(tenderType)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.termsAndConditions = result;

          console.log("Results ", result);

          if (this.termsAndConditions) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.termsAndConditions);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.termsAndConditions);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  typeSelected() {
    this.selectedEvenly = false;
    this.selectedCustom = true;
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
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  

  addTermsAndConditions(){
    this.dialogRef.close({ event: 'close', data: this.selectedRows });

    console.log("Selected Rows", this.selectedRows)
  }

}
