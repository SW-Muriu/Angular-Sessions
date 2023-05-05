import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { CommitteeService } from "src/app/data/services/admin/committee.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { Account } from "../../../users/data/types/account";
import { AccountDetailsComponent } from "../../../users/pages/account-details/account-details.component";
import { DeleteAccountComponent } from "../../../users/pages/delete-account/delete-account.component";
import { LockAccountComponent } from "../../../users/pages/lock-account/lock-account.component";
import { UpdateAccountComponent } from "../../../users/pages/update-account/update-account.component";
import { RemoveMemberFromCommitteeComponent } from "../dialogs/remove-member-from-committee/remove-member-from-committee.component";
import { UserDetailsComponent } from "../dialogs/user-details/user-details.component";

@Component({
  selector: "app-view-committee-memebers",
  templateUrl: "./view-committee-memebers.component.html",
  styleUrls: ["./view-committee-memebers.component.sass"],
})
export class ViewCommitteeMemebersComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "role",
    "department",
    "email",
    "phonenumber",
    //"updateRole",
    // "grantRights",
    "removeUserFromCommittee",
    "userdetails",
  ];
  users: Account[] = [];
  dataSource!: MatTableDataSource<Account>;
  selection = new SelectionModel<Account>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private committeeServuce: CommitteeService,
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
    this.committeeServuce
      .listAllCommitteeMembers()
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
    this.dialog.open(UpdateAccountComponent, dialogConfig);

    console.log(user);
  }

  userDetails(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: user
    };
    const dialogRef = this.dialog.open(UserDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers()
    });

  }

  removeMemberFromCommittee(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: user
    };
    const dialogRef = this.dialog.open(RemoveMemberFromCommitteeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers()
    });

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

  lockAccountCall(account) {
    this.dialog.open(LockAccountComponent, {
      data: {
        account: account,
        action: "details",
      },
      width: "500px",
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
    this.dialog.open(DeleteAccountComponent, dialogConfig);
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
