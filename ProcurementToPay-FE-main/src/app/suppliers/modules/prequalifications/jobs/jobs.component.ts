import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
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
import { Subscription } from "rxjs/internal/Subscription";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { PreqParametersService } from "src/app/procurement-admin/data/services/preq-params.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PaymentService } from "src/app/suppliers/data/services/payment.service";
import { PayPrequalificationBidfeeComponent } from "../dialogs/pay-prequalification-bidfee/pay-prequalification-bidfee.component";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.sass"],
})
export class JobsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  fetchedData: any;

  displayedColumns: string[] = [
    "id",
    "referenceid",
    "title",
    "category",
    "categorycode",
    "posteddate",
    "bidFee",
    "startdate",
    "closingdate",
    "status",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;

  routeState: any;
  dataSelected: any;
  subscription!: Subscription;
  currentUser: any;
  tenders: any;
  currentUserId: number;

  paymentStatus: boolean = false;

  @ViewChild(MatPaginator, { static: true }) listPaginator: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private announcementService: AnnouncementService,
    private localStorageService: LocalStorageService,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService,
    private preqParamService: PreqParametersService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.currentUserId = this.tokenService.getUser().id;
    this.getData();
  }

  refresh() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.announcementService.getApprovedPostedAnnouncements().subscribe(
      (result) => {
        this.tenders = result;

        //console.log("Results ", result);

        if (this.tenders) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.tenders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //  **************************************************************************************************************

  // ***************************************************************************************************************

  viewPendingBillCall(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view bill details",
      data: data,
    };
    // const dialogRef = this.dialog.open(ViewAnnouncementComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getApprovedAnnouncements();
    // });
  }

  viewBillDetails() {}

  updateStatus(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    //const dialogRef = this.dialog.open(VerifyAnnouncementComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getApprovedAnnouncements();
    // });
  }

  updateAnnouncement(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    // const dialogRef = this.dialog.open(EditAnnouncementComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getApprovedAnnouncements();
    // });
  }

  deleteAnnouncement(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data,
    };

    // const dialogRef = this.dialog.open(DeleteAnnouncementComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getApprovedAnnouncements();
    // });
  }

  // openDetails(data: any) {

  //   //this.router.navigateByUrl('/suppliers/prequalifications/job-details');

  // }

  confirmPaymement(data) {
    const params = new HttpParams()
      .set("prequalificationid", data.referenceid)
      .set("supplierid", this.currentUserId);

    this.paymentService.prequalificationPayementStatus(params).subscribe(
      (result) => {
        console.log("confirmPayment result: ", result);
        if (result.status == "Paid") {
          this.tenderDetails(data);
          this._snackBar.open(
            "PAYMENT STATUS: " +
              result.status +
              " PAYMENT MODE: " +
              result.paymentMode +
              " REFERENCE NO: " +
              result.refNo +
              " TRAN AMOUNT: " +
              result.transactionAmount +
              " TRAN DATE: " +
              result.trandate,
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-success", "snackbar-success"],
            }
          );
        } else if (result.status == "Failed") {
          this.payBidFee(data);
          this._snackBar.open(
            "PAYMENT STATUS: " +
              result.status +
              " PAYMENT MODE: " +
              result.paymentMode +
              " REFERENCE NO: " +
              result.refNo +
              " TRAN AMOUNT: " +
              result.transactionAmount +
              " TRAN DATE: " +
              new Date(result.trandate),
            "X",
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 50000,
              panelClass: ["snackbar-danger", "snackbar-danger"],
            }
          );
        }
      },
      (err) => {
        this.payBidFee(data);
        console.log(err);
      }
    );
  }

  tenderDetails(data) {
    this.router.navigate(["/suppliers/prequalifications/job-details"], {
      state: {
        preqDetails: JSON.stringify(data),
        action: "Job details",
      },
    });
  }

  payBidFee(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "700px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(
      PayPrequalificationBidfeeComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      //console.log("result:= ", result)
      // if(result.message){
      //   this.confirmPaymement(data)
      // }
    });
  }
}
