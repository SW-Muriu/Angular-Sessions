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
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RfqsService } from "src/app/data/services/financial-evaluator/rfqs.service";
import { NeedRequisitionService } from "src/app/data/services/need-requisition/need-requisition.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { RfqApplicationService } from "src/app/data/services/supplier/rfq-application.service";
import { RfqDetailsComponent } from "src/app/financial-evaluators/modules/rfqs/pages/dialogs/rfq-details/rfq-details.component";
import { UpdateRfqComponent } from "src/app/financial-evaluators/modules/rfqs/pages/dialogs/update-rfq/update-rfq.component";
import { VerifyRfqsComponent } from "src/app/procurement-admin/modules/rfqs/pages/dialogs/verify-rfqs/verify-rfqs.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderDetailsComponent } from "src/app/technical-evaluator/modules/tender/dialog/tender-details/tender-details.component";
import { DeleteRfqBidComponent } from "../../dialogs/delete-rfq-bid/delete-rfq-bid.component";
import { DeleteRfqComponent } from "../../dialogs/delete-rfq/delete-rfq.component";
import { RfqBidDetailsComponent } from "../../dialogs/rfq-bid-details/rfq-bid-details.component";
import { UpdateRfqBidComponent } from "../../dialogs/update-rfq-bid/update-rfq-bid.component";

@Component({
  selector: "app-pending-rfq-applications",
  templateUrl: "./pending-rfq-applications.component.html",
  styleUrls: ["./pending-rfq-applications.component.sass"],
})
export class PendingRfqApplicationsComponent
  extends BaseComponent
  implements OnInit
{
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "referenceid",
    "rfqtitle",
    "suppliername",
    "applicationstatusreceived",
    "status",
    "createdon",
    "actions",
  ];
  rfqs: any[] = [];
  pendingRfqs: any[] = [];
  supplierId: number;
  user: any;

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
    private dialog: MatDialog,
    private router: Router,
    private rfqService: RfqsService,
    private rfqApplicationService: RfqApplicationService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()

    this.supplierId = this.user.id;
    
    this.getTenders(this.supplierId);
  }

  refresh() {
    this.getTenders(this.supplierId);
  }

  getTenders(supplierId) {
    this.rfqApplicationService
      .fetchRFQApplicationBySupplierId(supplierId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.rfqs = result;

          if (this.rfqs.length > 0) {
            this.pendingRfqs = [];

            this.rfqs.forEach((rfq) => {
              if (rfq.status == "Pending") {
                this.pendingRfqs.push(rfq);
              }
            });

            console.log("Results ", result);

            if (this.pendingRfqs.length > 0) {
              this.isLoading = false;

              this.dataSource = new MatTableDataSource<any>(this.pendingRfqs);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  rfqBidDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(RfqBidDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.supplierId);
    });
  }

  verifyRFQBid(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(VerifyRfqsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.supplierId);
    });
  }

  createRFQ() {
    this.router.navigate(["/procurement-admin/rfqs/create-rfq"]);
  }

  updateRFQBid(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(UpdateRfqBidComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.supplierId);
    });
  }

  deleteRFQBid(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(DeleteRfqBidComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.supplierId);
    });
  }

  updatePendingRfqApplication(rfq) {
    this.router.navigate(
      ["/suppliers/rfqs/pending-rfq-applications/update-pending-quatation"],
      {
        state: {
          quotation: JSON.stringify(rfq),
        },
      }
    );
  }

  

  // updateTender(id) {
  //   console.log(233)
  //  this.router.navigate([`/procurement-admin/tender/update-tender/${id}`])
  // }

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
