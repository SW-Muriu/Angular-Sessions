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
import { TenderService } from "src/app/suppliers/data/services/tenders.service";
import { PayBidfeeComponent } from "../dialogs/pay-bidfee/pay-bidfee.component";

@Component({
  selector: 'app-all-posted-tenders',
  templateUrl: './all-posted-tenders.component.html',
  styleUrls: ['./all-posted-tenders.component.sass']
})
export class AllPostedTendersComponent implements OnInit {

  fetchedData: any;
  subscription!: Subscription;

  displayedColumns: string[] = [
    "id",
    "tenderNo",
    "title",
    "categorycode",
    "bidType",
    "bidFee",
    "procuringentity",
    "actions"
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

  rowDummy: { name: 'name' }

  paymentStatus: boolean = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tenderService: TenderService,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.getPostedTenders();
    this.getAllCategories();
  }

  refresh() {
    this.getPostedTenders();
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
      this.getPostedTenders();
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
    this.tenderService.getPrequalifiedByCategoryCode(params).subscribe(
      (res) => {
        console.log("Tenders: ", res);
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
  getPostedTenders() {
    this.tenderService.getPostedTenders().subscribe(
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

  confirmPaymement(data) {
    if (this.paymentStatus == true) {
      this.tenderDetails(data)
    }
    else {
      this.payBidFee(data);
    }

  }

  tenderDetails(data) {
    this.router.navigate(
      ["/suppliers/tenders/view-tender-details"],
      {
        state: {
          selectedDetails: JSON.stringify(data),
          action: 'tender details'
        },
      }
    );
  }

  payBidFee(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(PayBidfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPostedTenders();
    });
  }

}
