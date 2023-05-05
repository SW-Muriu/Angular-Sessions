import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { RfqApplicationService } from 'src/app/data/services/supplier/rfq-application.service';
import { DeleteRfqComponent } from 'src/app/financial-evaluators/modules/rfqs/pages/dialogs/delete-rfq/delete-rfq.component';
import { UpdateRfqComponent } from 'src/app/financial-evaluators/modules/rfqs/pages/dialogs/update-rfq/update-rfq.component';
import { VerifyRfqsComponent } from 'src/app/procurement-admin/modules/rfqs/pages/dialogs/verify-rfqs/verify-rfqs.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RfqApplicationDetailsComponent } from '../../dialogs/rfq-application-details/rfq-application-details.component';
import { VerifyRfqApplicationComponent } from '../../dialogs/verify-rfq-application/verify-rfq-application.component';

@Component({
  selector: 'app-rfq-rejected-applications',
  templateUrl: './rfq-rejected-applications.component.html',
  styleUrls: ['./rfq-rejected-applications.component.sass']
})
export class RfqRejectedApplicationsComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  displayedColumns: string[] = [
    "id",
    "rfqtitle",
    "referenceid",
    "supplieremail",
    "applicationstatusreceived",
    "status",
    "createdon",
    "viewDetails",
    "verifyApplication"
  ];
  rfqs: any[] = [];
  pendingRfqApplications: any[] = [];
  rfqApplications: any[] = [];

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
  rfqId: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private rfqApplicationsService: RfqApplicationService,
    private rfqService: RfqsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.subject)).subscribe(param => {
     
      this.rfqId = param.id

      console.log("RFQID", param);
    })

    this.getTenders(this.rfqId);
  }

  refresh() {
    this.getTenders(this.rfqId);
  }

  getTenders(id) {
    this.rfqApplicationsService.fetchRejectedApplicationsinRfqByRfqId(id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.rfqApplications = result;

          console.log("Rejected Applications ", this.rfqApplications)

            if(this.rfqApplications.length > 0){
              this.isLoading = false;

              this.dataSource = new MatTableDataSource<any>(this.rfqApplications);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  rfqApplicationsDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(RfqApplicationDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.rfqId);
    });
  }

  viewRfqApplications(id){
    this.router.navigate([`/commons/rejected-rfq-applications/${id}`])
  }

  verifyRfqApplications(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(VerifyRfqApplicationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.rfqId);
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
      this.getTenders(this.rfqId);
    });
  }

  createRFQ() {
    this.router.navigate(["/procurement-admin/rfqs/create-rfq"]);
  }

  updateRFQ(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(UpdateRfqComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.rfqId);
    });
  }

  deleteRFQ(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(DeleteRfqComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders(this.rfqId);
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
