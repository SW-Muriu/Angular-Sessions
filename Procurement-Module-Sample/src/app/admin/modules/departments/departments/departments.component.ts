import { SelectionModel } from '@angular/cdk/collections';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentsService } from 'src/app/admin/data/services/departments.service';

import { CreateDepartmentsComponent } from './dialogs/create-departments/create-departments.component';
import { DeleteDepartmentsComponent } from './dialogs/delete-departments/delete-departments.component';
import { ViewDepartmentsComponent } from './dialogs/view-departments/view-departments.component';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.sass']
})
export class DepartmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  // employeeEmail: any;
  // employee_id: any;
  // creatingAccount = false;
  formData: any;

  isLoading = true;




  constructor(
    private router: Router,
    private ngZone: NgZone,
    private deptService: DepartmentsService, private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();

  }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData() {
    this.subscription = this.deptService.getDepartments().subscribe(res => {
      this.data = res;
      //console.log("All departments =", res);

      if (this.data) {
        this.isLoading = false;
      }


      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }




  refresh() {
    this.getData();
    //console.log("Table Refreshed")
  }



  addDepartment() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = '500px'
    dialogConfig.data = {
      // test:this.assetDetail
      test: "data"
    }

    const dialogRef = this.dialog.open(CreateDepartmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }
  deleteDepartment(sender) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    dialogConfig.data = {
      sender,
    };

    const dialogRef = this.dialog.open(DeleteDepartmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  // Create DialodBoxes
  onSelect(data: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = '500px'
    //dialogConfig.height = '400px'
    dialogConfig.data = {
      // test:this.assetDetail
      test: data
    }


    const dialogRef = this.dialog.open(ViewDepartmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });

  }




}
