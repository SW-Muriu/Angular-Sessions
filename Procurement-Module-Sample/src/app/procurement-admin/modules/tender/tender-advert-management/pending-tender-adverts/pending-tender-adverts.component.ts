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
import { TenderAdvertService } from "src/app/data/services/procurement-admin/tender-advert.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DeleteTenderAdvertComponent } from "../../dialog/delete-tender-advert/delete-tender-advert.component";
import { TenderAdvertDetailsComponent } from "../../dialog/tender-advert-details/tender-advert-details.component";
import { VerifyTenderAdvertComponent } from "../../dialog/verify-tender-advert/verify-tender-advert.component";

@Component({
  selector: "app-pending-tender-adverts",
  templateUrl: "./pending-tender-adverts.component.html",
  styleUrls: ["./pending-tender-adverts.component.sass"],
})
export class PendingTenderAdvertsComponent
  extends BaseComponent
  implements OnInit
{
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "advertNo",
    "noticeTitle",
    // "companyName",
    "noticeDescription",
    "websiteLink",
    "status",
    "postedBy",
    "postedTime",
    "actions",
  ];
  tenderAdverts: any[] = [];
  pendingTenderAdverts: any[] = [];

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
    private tenderAdvertService: TenderAdvertService,
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
    this.tenderAdvertService
      .fetchAllTenderAdverts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.tenderAdverts = [];

          this.tenderAdverts = result;

          console.log("Results ", result);

          if (this.tenderAdverts) {
            this.pendingTenderAdverts = [];

            this.tenderAdverts.forEach((tenderAdvert) => {
              if (tenderAdvert.status === "Pending")
                this.pendingTenderAdverts.push(tenderAdvert);
            });

            console.log("Pending Tender Adverts", this.pendingTenderAdverts);

            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(
              this.pendingTenderAdverts
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

        },
        (err) => {
          console.log(err);
        }
      );
  }

  navigateToRequestNeed() {
    this.router.navigate(["/procurement-admin/tender/generate-tender-advert"]);
  }

  updateTender(id) {
    console.log(233);
    this.router.navigate([
      `/procurement-admin/tender/update-tender-advert/${id}`,
    ]);
  }

  tenderAdvertDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      TenderAdvertDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
  }

  deleteTenderAdvertCall(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      DeleteTenderAdvertComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
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
