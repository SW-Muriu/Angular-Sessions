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
import { PendingAnnouncementsComponent } from '../../pending-announcements/pending-announcements.component';


@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.sass']
})
export class ViewAnnouncementComponent implements OnInit {
 
  displayedColumns: string[] = [
    "id",
    "requirement",
    "inputType",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  
  Data: any; 
  requirementList: any[] = [];

  constructor(public dialogRef: MatDialogRef<PendingAnnouncementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService) {

      console.log(this.data)
     }

  ngOnInit(): void {
    this.Data = this.data.data;

    this.requirementList = this.Data.requirementsList;

    console.log("DATA", this.data)

    console.log("this.requirementList: ", this.requirementList);

    this.dataSource = new MatTableDataSource<any>(this.requirementList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
