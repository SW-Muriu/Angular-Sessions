import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { ApplicationsService } from "src/app/procurement-admin/data/services/applications.service";
import { DeleteApplicationComponent } from "../dialogs/delete-application/delete-application.component";
import { ViewApplicationComponent } from "../dialogs/view-application/view-application.component";


@Component({
  selector: 'app-approved-applications',
  templateUrl: './approved-applications.component.html',
  styleUrls: ['./approved-applications.component.sass']
})
export class ApprovedApplicationsComponent implements OnInit {

  fetchedData: any;
  
  displayedColumns: string[] = [
    "id",
    "referenceid",
    "prequalificationtitle",
    "suppliername",
    "submittedon",
    "reviewedon",
    "reviewedby",
    "status",

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
    private applicationsService: ApplicationsService,
    private tokenService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.getApprovedApplications();
  }

  refresh() {
    this.getApprovedApplications();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  getApprovedApplications() {
    this.applicationsService.getApprovedApplications().subscribe(
      (res) => {
        console.log("Approved: ", res);

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

  viewPendingBillCall(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      action: "view bill details",
      data: data
    };
 ;
    const dialogRef = this.dialog.open(ViewApplicationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getApprovedApplications();
    });
  }

deleteAnnouncement(data){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "500px";
  dialogConfig.data = {
    data: data
  };


  const dialogRef = this.dialog.open(DeleteApplicationComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((result) => {
    this.getApprovedApplications();
  });

}
openDetails(data: any) {

  this.router.navigate(
    ["/procurement-admin/recieved-applications/view-application"],
    {
      state: {
        jobDetails: JSON.stringify(data),
        action: 'Job details'
      },
    }
  );

}
}
