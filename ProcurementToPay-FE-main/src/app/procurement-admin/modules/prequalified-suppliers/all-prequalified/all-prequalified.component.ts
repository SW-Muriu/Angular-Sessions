import { SelectionModel } from "@angular/cdk/collections";
import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { PrequalifiedService } from "src/app/procurement-admin/data/services/prequalified.service";
import { TenderService } from "src/app/suppliers/data/services/tenders.service";


@Component({
  selector: 'app-all-prequalified',
  templateUrl: './all-prequalified.component.html',
  styleUrls: ['./all-prequalified.component.sass']
})
export class AllPrequalifiedComponent implements OnInit {

  fetchedData: any;
  subscription!: Subscription;

  displayedColumns: string[] = [
    "id",
    "prequalificationcode",
    "referenceid",
    "categorycode",
    "suppliername",
    "prequalifiedon",
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

  categories: any[] = [];
  defaultSelect: string = 'All';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private prequalifiedService: PrequalifiedService,
    private tokenService: TokenStorageService,
    private tenderService: TenderService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.getPrequalifiedSuppliers();
    this.getAllCategories();
  }

  refresh() {
    this.getPrequalifiedSuppliers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectedCategory(event: any) {
    console.log("event.log", event.value)
    this.fetchedData = null;
    this.dataSource = null;
    this.isLoading = true;
    
    if (event.value == 'All') {
      this.getPrequalifiedSuppliers();
    } else {
      this.getPrequalifiedByCategoryCode(event.value);
    }

  }
  getAllCategories() {
    this.tenderService
      .getTenders()
      .subscribe((res) => {
        this.categories = res;
        console.log("Tender categories =", res);

      });
  }
  getPrequalifiedByCategoryCode(code) {
    const params = new HttpParams()
    .set("categorycode", code);
    this.prequalifiedService.getPrequalifiedByCategoryCode(params).subscribe(
      (res) => {
        console.log("Prequalified: ", res);
        this.fetchedData = res;
        if (this.fetchedData) {
          this.isLoading = false;
          this.allocateDatasource();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPrequalifiedSuppliers() {
    this.prequalifiedService.getPrequalifiedSuppliers().subscribe(
      (res) => {
        console.log("Prequalified: ", res);
        this.fetchedData = res;
        if (this.fetchedData) {
          this.isLoading = false;
          this.allocateDatasource();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  allocateDatasource() {
    this.dataSource = null;
    this.dataSource = new MatTableDataSource<any>(this.fetchedData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewPendingBillCall(data) {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = false;
    //     dialogConfig.autoFocus = true;
    //     dialogConfig.width = "1000px";
    //     dialogConfig.data = {
    //       action: "view bill details",
    //       data: data
    //     };
    //  ;
    //     const dialogRef = this.dialog.open(ViewApplicationComponent, dialogConfig);

    //     dialogRef.afterClosed().subscribe((result) => {
    //       this.getPrequalifiedSuppliers();
    //     });
  }

  deleteAnnouncement(data) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "500px";
    // dialogConfig.data = {
    //   data: data
    // };


    // const dialogRef = this.dialog.open(DeleteApplicationComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getPrequalifiedSuppliers();
    // });

  }
  // http://52.15.152.26:1905/P2PSolution/p2p/prequalifiedsuppliers/all
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
