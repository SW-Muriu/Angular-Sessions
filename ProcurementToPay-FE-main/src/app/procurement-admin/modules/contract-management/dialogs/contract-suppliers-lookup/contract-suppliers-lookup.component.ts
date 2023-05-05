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
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { TenderAdvertService } from 'src/app/data/services/procurement-admin/tender-advert.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AddContractComponent } from '../../add-contract/add-contract.component';


@Component({
  selector: 'app-contract-suppliers-lookup',
  templateUrl: './contract-suppliers-lookup.component.html',
  styleUrls: ['./contract-suppliers-lookup.component.sass']
})
export class ContractSuppliersLookupComponent implements OnInit {

  

  displayedColumns: string[] = [
    "select",
    "supplierid",
    "companyname",
    "emailaddress",
    "taxpin",
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

  supplierDetails: any;
  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  suppliersArray: any[] = [];

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddContractComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private tenderAdvertService: TenderAdvertService,
    private biddersService: BiddersService
  ) {
    this.Data = data.selected;
  }

  ngOnInit(): void {
    this.getBidders();

    //this.supplierDetails = this.data.data;
    this.suppliersArray = this.Data;

    console.log("this.suppliersArray: ", this.suppliersArray);

    // this.dataSource = new MatTableDataSource<any>(this.supplierDetails);
    // this.dataSource.sort = this.sort;

    
  }

 
  getBidders() {
    this.biddersService
      .getAllBidders()
      .subscribe(
        (res) => {
          this.supplierDetails = res;

          console.log("Bidders", this.supplierDetails)

          if (this.supplierDetails) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<any>(this.supplierDetails);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if (this.suppliersArray.length !== 0) {
            this.filter();
            console.log("filter by: ", this.suppliersArray);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  filter() {
    this.dataSource.data.forEach((element) => {
      this.suppliersArray.forEach((item) => {
        if (item === parseInt(element.supplierid)) {
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
