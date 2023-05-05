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
import { PendingTendersComponent } from '../../all/pending-tenders/pending-tenders.component';

@Component({
  selector: 'app-tender-advert-details',
  templateUrl: './tender-advert-details.component.html',
  styleUrls: ['./tender-advert-details.component.sass']
})
export class TenderAdvertDetailsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "tenderNo",
    "tendertitle",
    "closingDate",
    "tenderDescripion"
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  
  tenderAdvertDetails: any; 
  tenders: any[] = [];

  constructor(public dialogRef: MatDialogRef<PendingTendersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService) {
      super();

      console.log(this.data)
     }

  ngOnInit(): void {
    this.tenderAdvertDetails = this.data.data;

    this.tenders = this.tenderAdvertDetails.tenders;

    console.log("DATA", this.data)

    console.log(": ", this.tenderAdvertDetails.tenders);

    this.dataSource = new MatTableDataSource<any>(this.tenders);
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
