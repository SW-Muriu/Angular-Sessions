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
import { PendingRfqsComponent } from '../../all/pending-rfqs/pending-rfqs.component';

@Component({
  selector: 'app-rfq-details',
  templateUrl: './rfq-details.component.html',
  styleUrls: ['./rfq-details.component.sass']
})
export class RfqDetailsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "itemName",
    "itemName",
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
  
  rfqDetails: any; 
  particulars: any[] = [];

  constructor(public dialogRef: MatDialogRef<PendingRfqsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService) {
      super();

      console.log(this.data)
     }

  ngOnInit(): void {
    this.rfqDetails = this.data.data;

    this.particulars = this.rfqDetails.particulars;

    console.log("DATA", this.data)

    console.log(this.rfqDetails.particulars);

    this.dataSource = new MatTableDataSource<any>(this.particulars);
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
