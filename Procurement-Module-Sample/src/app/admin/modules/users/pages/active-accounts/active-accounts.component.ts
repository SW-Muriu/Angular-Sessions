import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";
import { AccountDetailsComponent } from "../account-details/account-details.component";
import { DeleteAccountComponent } from "../delete-account/delete-account.component";
import { LockAccountComponent } from "../lock-account/lock-account.component";
import { UnlockAccountComponent } from "../unlock-account/unlock-account.component";
import { UpdateAccountComponent } from "../update-account/update-account.component";

@Component({
  selector: "app-active-accounts",
  templateUrl: "./active-accounts.component.html",
  styleUrls: ["./active-accounts.component.sass"],
})
export class ActiveAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "department",
    "email",
    "phonenumber",
    "actions",
    "update",
    "logs",
  ];
  users: Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router
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
    this.accountService
      .listActiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res;

          if (this.users) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Account>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editCall(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user,
    };
    //this.dialog.open(UpdateAccountComponent, dialogConfig);

    const dialogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });

    console.log(user);
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
    // this.dialog.open(AccountDetailsComponent, {
    //   data: {
    //     account: account,
    //     action: "details",
    //   },
    //   width: "500px",
    // });

    const dialogRef = this.dialog.open(AccountDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  lockAccountCall(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account: account,
      action: "details",
    };
    const dialogRef = this.dialog.open(LockAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  deleteCall(account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      account,
    };


    const dialogRef = this.dialog.open(DeleteAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  updateUser(userId) {
    this.router.navigate([`admin/user-accounts/modify-account/${userId}`]);
  }

  viewAccountLogs(userId) {
    this.router.navigate([`admin/user-accounts/account-logs/${userId}`]);
  }

  addNew() {
    this.router.navigate(["/admin/user-accounts/add-account"]);
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
