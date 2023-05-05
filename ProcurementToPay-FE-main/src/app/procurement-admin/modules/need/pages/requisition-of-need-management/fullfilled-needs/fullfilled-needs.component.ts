import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DeleteNeedComponent } from '../dialogs/delete-need/delete-need.component';

@Component({
  selector: 'app-fullfilled-needs',
  templateUrl: './fullfilled-needs.component.html',
  styleUrls: ['./fullfilled-needs.component.sass']
})
export class FullfilledNeedsComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "reqCode",
    "need",
    "address",
    "type",
    "status",
    "requestDate",
    "verify",
    "despcription",
    "actions",
  ];
  needs: any[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  loading = false;
  retryPosting: boolean = false;
  postToUraFailed: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private needRequisitionService: NeedRequisitionService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getNeeds();
  }

  refresh() {
    this.getNeeds();
  }

  getNeeds() {
    this.needRequisitionService
      .fetchFullFilledNeeds()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.needs = result;

          console.log("Results ",result)

          if (this.needs) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.needs);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.needs);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  navigateToNeedDetails(needId) {
    this.router.navigate([
      `/departmental-users/need-management/need-details/${needId}`,
    ]);
  }

  navigateToRequestNeed() {
    this.router.navigate([
      "/departmental-users/need-management/need-requisition-form",
    ]);
  }

  updateNeed(needId) {
   this.router.navigate([`/departmental-users/need-management/update-need/${needId}`])
  }

  deleteNeed(invoice) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: invoice,
    };
    this.dialog.open(DeleteNeedComponent, dialogConfig);
  }

  verifyInvoice() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
