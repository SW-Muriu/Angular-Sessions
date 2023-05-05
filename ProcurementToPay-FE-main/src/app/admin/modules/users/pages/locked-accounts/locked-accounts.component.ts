import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";
import { AccountDetailsComponent } from "../account-details/account-details.component";
import { UnlockAccountComponent } from "../unlock-account/unlock-account.component";

@Component({
  selector: "app-locked-accounts",
  templateUrl: "./locked-accounts.component.html",
  styleUrls: ["./locked-accounts.component.sass"],
})
export class LockedAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "email",
    "status",
    "phonenumber",
    "actions",
  ];
  lockedAccounts: Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    
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
    this.getLockedAccounts();
  }

  refresh() {
    this.getLockedAccounts();
  }

  getLockedAccounts() {
    this.accountService
      .getLockedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.lockedAccounts = res;

          if (this.lockedAccounts.length > 0) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Account>(
            this.lockedAccounts
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  detailsCall(account) {
    this.dialog.open(AccountDetailsComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "500px",
    });
  }

  unlockAccountCall(account){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account: account,
        action: "details",
    };


    const dialogRef = this.dialog.open(UnlockAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getLockedAccounts();
    });

    // this.dialog.open(UnlockAccountComponent, {
    //   data: {
    //     account: account,
    //     action: "details",
    //   },
    //   width: "500px",
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Account) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
