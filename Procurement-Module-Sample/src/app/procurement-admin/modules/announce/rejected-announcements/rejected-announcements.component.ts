import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DeleteAnnouncementComponent } from "../dialogs/delete-announcement/delete-announcement.component";
import { VerifyAnnouncementComponent } from "../dialogs/verify-announcement/verify-announcement.component";
import { ViewAnnouncementComponent } from "../dialogs/view-announcement/view-announcement.component";


@Component({
  selector: 'app-rejected-announcements',
  templateUrl: './rejected-announcements.component.html',
  styleUrls: ['./rejected-announcements.component.sass']
})
export class RejectedAnnouncementsComponent implements OnInit {

  fetchedData: any;

  displayedColumns: string[] = [
    "id",
    "referenceid",
    "category",
    "startdate",
    "closingdate",
    "postedby",
    "posteddate",
    "procadminverifyflag",
    "deskevaluatorverifyflag",
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

  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private announcementService: AnnouncementService,
    private localStorageService: LocalStorageService,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService
  ) { }


  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.getRejectedAnnouncements();

  }

  refresh() {
    this.getRejectedAnnouncements();
  }
  add(){
    this.router.navigateByUrl('/procurement-admin/announce/add')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRejectedAnnouncements() {
    this.announcementService.getRejectedAnnouncements().subscribe(
      (res) => {
        console.log("Announcements: ", res);

        this.fetchedData = res;

        if (this.fetchedData) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.fetchedData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewPendingBillCall(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view bill details",
      data: data
    };
    ;
    const dialogRef = this.dialog.open(ViewAnnouncementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRejectedAnnouncements();
    });
  }

  preqDetails(row) { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(ViewAnnouncementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRejectedAnnouncements();
    });

  }

  updateStatus(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(VerifyAnnouncementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRejectedAnnouncements();
    });

  }

  updateAnnouncement(row) {
    this.router.navigate(
      ["/procurement-admin/announce/update-announcement"],
      {
        state: {
          jobDetails: JSON.stringify(row),
          action: 'Job details'
        },
      }
    );
  }

  deleteAnnouncement(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: data
    };


    const dialogRef = this.dialog.open(DeleteAnnouncementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRejectedAnnouncements();
    });

  }

}
