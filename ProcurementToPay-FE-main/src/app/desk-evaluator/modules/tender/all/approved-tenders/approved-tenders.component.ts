import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
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
import { takeUntil } from "rxjs";
import { NeedRequisitionService } from "src/app/data/services/need-requisition/need-requisition.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderDetailsComponent } from "../../dialog/tender-details/tender-details.component";

@Component({
  selector: "app-approved-tenders",
  templateUrl: "./approved-tenders.component.html",
  styleUrls: ["./approved-tenders.component.sass"],
})
export class ApprovedTendersComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "tenderNo",
    "title",
    "budget",
    // "startDate",
    // "closingDate",
    "deskApproved",
    "financeApproved",
    "technicalApproved",
    "postedBy",
    "closureStatus",
    "viewDetails"
  ];
  tenders: any[] = [];

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
    private tenderPreperationService: TenderPreperationService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTenders();
  }

  refresh() {
    this.getTenders();
  }

  getTenders() {
    this.tenderPreperationService
      .getRoleDeskApproved()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.tenders = result;

          console.log("Results ",result)

          if (this.tenders) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.tenders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.tenders);
        },
        (err) => {
          console.log(err);
        }
      );
  }


  tenderDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(TenderDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
  }


  navigateToRequestNeed() {
    this.router.navigate([
      "/departmental-users/need-management/need-requisition-form",
    ]);
  }

  updateTender(id) {
    console.log(233)
   this.router.navigate([`/procurement-admin/tender/update-tender/${id}`])
  }

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
