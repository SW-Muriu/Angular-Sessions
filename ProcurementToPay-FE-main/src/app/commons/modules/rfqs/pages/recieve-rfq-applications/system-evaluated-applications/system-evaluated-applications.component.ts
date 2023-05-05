import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { RfqEvaluationService } from 'src/app/data/services/commons/rfq-evaluation.service';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { RfqApplicationService } from 'src/app/data/services/supplier/rfq-application.service';
import { DeleteRfqComponent } from 'src/app/financial-evaluators/modules/rfqs/pages/dialogs/delete-rfq/delete-rfq.component';
import { UpdateRfqComponent } from 'src/app/financial-evaluators/modules/rfqs/pages/dialogs/update-rfq/update-rfq.component';
import { VerifyRfqsComponent } from 'src/app/procurement-admin/modules/rfqs/pages/dialogs/verify-rfqs/verify-rfqs.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RfqBidDetailsComponent } from 'src/app/suppliers/modules/rfqs/pages/dialogs/rfq-bid-details/rfq-bid-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-evaluated-applications',
  templateUrl: './system-evaluated-applications.component.html',
  styleUrls: ['./system-evaluated-applications.component.sass']
})
export class SystemEvaluatedApplicationsComponent extends BaseComponent implements OnInit {
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
    // "postedTime",
    "viewDetails",
    "sysevaluate",
    "viewApplications"
  ];
  rfqs: any[] = [];
  pendingRfqApplications: any[] = [];
  openRfqs: any[] = [];

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
    private rfqApplicationsService: RfqApplicationService,
    private rfqEvaluationService: RfqEvaluationService,
    private rfqService: RfqsService
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
    this.rfqApplicationsService.fetchAllVerifedRfqsWithApprovedApplications()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.openRfqs = result;

          console.log("RFQ Applications", this.openRfqs)

            if(this.openRfqs.length > 0){
              this.isLoading = false;

              this.dataSource = new MatTableDataSource<any>(this.openRfqs);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
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
    const dialogRef = this.dialog.open(RfqBidDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTenders();
    });
  }

  systemEvaluate(id){
    Swal.fire({
      title: "Execute System Evaluation?",
      text: "Click proceed to initiate system evaluation !",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed !",
    }).then((result) => {
      if (result.isConfirmed) {
        this.rfqEvaluationService.evaluateRfqApplicaction(id).pipe(takeUntil(this.subject)).subscribe(res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      }
    });
  }

  viewRfqApplications(id){
    this.router.navigate([`/commons/rfqs/system-evaluated-rfq-applications/${id}`])
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
