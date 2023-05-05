import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ActivateBidderAccountComponent } from '../dialogs/activate-bidder-account/activate-bidder-account.component';
import { BidderDetailsComponent } from '../dialogs/bidder-details/bidder-details.component';

@Component({
  selector: 'app-inactive-accounts',
  templateUrl: './inactive-accounts.component.html',
  styleUrls: ['./inactive-accounts.component.sass']
})
export class InactiveAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "firstname",
    "companyname",
    "country",
    "emailaddress",
    "phonenumber",
    "supplylocations",
    "taxpin",
    "createdOn",
    "actions",
    "viewDetails"
  ];
  bidders: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private biddersService: BiddersService
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllUsers();
  }

  refresh() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.biddersService
      .getAllInactiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.bidders = res;

          if (this.bidders) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<any>(this.bidders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  activateBidder(any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      any: any,
      action: "details",
    };

    const dialogRef = this.dialog.open(ActivateBidderAccountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  detailsCall(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account: account,
      action: "details",
    };
  

    const dialogRef = this.dialog.open(BidderDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
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
