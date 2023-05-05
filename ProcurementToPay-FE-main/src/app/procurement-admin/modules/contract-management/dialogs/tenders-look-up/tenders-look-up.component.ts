import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/admin/data/services/localstorage.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { AddContractComponent } from '../../add-contract/add-contract.component';


@Component({
  selector: 'app-tenders-look-up',
  templateUrl: './tenders-look-up.component.html',
  styleUrls: ['./tenders-look-up.component.sass']
})
export class TendersLookUpComponent implements OnInit {

  displayedColumns: string[] = [
    "select",
    "tenderNo",
    "title",
    "startDate",
    "closingDate",
    "closureStatus",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


  Data?: any;

  subscription!: Subscription;
  accounts: any;

  isLoading: boolean = true;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  centersList: any;
  selectedCenter: any;


  selection = new SelectionModel<any>(false, []);

  tenderDetails: any;
  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  tendersArray: any[] = [];

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  
    private tenderPreperationService: TenderPreperationService,
  ) {
    this.Data = data.selected;
  }

  ngOnInit(): void {
    this.getTenders();

    this.tendersArray = this.Data;

    console.log("this.tendersArray: ", this.tendersArray);
    
  }

  getTenders() {
    this.tenderPreperationService
      .fetchPostedTenders()
      .subscribe(
        (result) => {
          this.tenderDetails = result;

          console.log("Results ",result)

          if (this.tenderDetails) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.tenderDetails);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.tenderDetails);

          if (this.tendersArray.length !== 0) {
            this.filter();
            console.log("filter by: ", this.tendersArray);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filter() {
    this.dataSource.data.forEach((element) => {
      this.tendersArray.forEach((item) => {
        if (item === element.id) {
          this.selection.select(element);
        }
      });
    });

    console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }

  checkboxActive() {
    this.selectedRows = this.selection.selected;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  proceed() {
    this.dialogRef.close({ event: 'close', data: this.selectedRows });

    console.log("Selected Rows", this.selectedRows)
  }
}
