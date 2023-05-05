import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PendingNeedsComponent } from '../pending-needs/pending-needs.component';

@Component({
  selector: 'app-need-details',
  templateUrl: './need-details.component.html',
  styleUrls: ['./need-details.component.sass']
})
export class NeedDetailsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "itemName",
    "itemQuantity",
    "itemDescription",
    "unitPrice",
    "totalPrice",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  
  needDetails: any; 
  needParticulars: any[] = [];

  constructor(public dialogRef: MatDialogRef<PendingNeedsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService) {
      super();

      console.log(this.data)
     }

  ngOnInit(): void {
    this.needDetails = this.data.data;

    this.needParticulars = this.needDetails.reqParticulars;

    console.log("DATA", this.data)

    console.log("this.needDetails: ", this.needDetails.expenses);

    this.dataSource = new MatTableDataSource<any>(this.needParticulars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
