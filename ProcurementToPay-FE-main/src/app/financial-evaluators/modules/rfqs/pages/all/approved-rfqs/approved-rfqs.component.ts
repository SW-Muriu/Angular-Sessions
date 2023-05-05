import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { VerifyRfqsComponent } from 'src/app/procurement-admin/modules/rfqs/pages/dialogs/verify-rfqs/verify-rfqs.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RfqDetailsComponent } from '../../dialogs/rfq-details/rfq-details.component';

@Component({
  selector: 'app-approved-rfqs',
  templateUrl: './approved-rfqs.component.html',
  styleUrls: ['./approved-rfqs.component.sass']
})
export class ApprovedRfqsComponent extends BaseComponent implements OnInit {
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
    // "verifyRFQ",
    "viewDetails"
  ];
  rfqs: any[] = [];
  approvedRfqs: any[] = [];

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
    private rfqService: RfqsService,
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
            this.approvedRfqs = [];

            this.rfqs.forEach((rfq) => {
              if (rfq.status == "Approved") {
                this.approvedRfqs.push(rfq);
              }
            });

            console.log("Results ", result);

            if (this.approvedRfqs.length > 0) {
              this.isLoading = false;

              this.dataSource = new MatTableDataSource<any>(this.approvedRfqs);
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

  verifyRFQ(row){
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
