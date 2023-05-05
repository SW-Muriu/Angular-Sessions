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
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { RfqDetailsComponent } from '../../dialogs/rfq-details/rfq-details.component';
import { VerifyRfqsComponent } from '../../dialogs/verify-rfqs/verify-rfqs.component';

@Component({
  selector: 'app-pending-rfqs',
  templateUrl: './pending-rfqs.component.html',
  styleUrls: ['./pending-rfqs.component.sass']
})
export class PendingRfqsComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "rfqCode",
    "title",
    "bidFee",
    "responseDeadline",
    "projectDeadline",
    "rfqStatus",
    "status",
    "postedBy",
    "postedTime",
    "verifyRFQ",
    "viewDetails"
  ];
  rfqs: any[] = [];
  pendingRfqs: any[] = []

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
    private rfqService: RfqsService,
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
    this.rfqService
      .fetchAllRFQs()
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


  rfqDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(RfqDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
  }

  verifyRFQ(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(VerifyRfqsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
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
