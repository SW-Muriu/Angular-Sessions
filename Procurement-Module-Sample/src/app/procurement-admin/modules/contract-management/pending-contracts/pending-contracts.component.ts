import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NeedRequisitionService } from 'src/app/data/services/need-requisition/need-requisition.service';
import { ContractsService } from 'src/app/procurement-admin/data/services/contracts.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { VerifyContractComponent } from '../dialogs/verify-contract/verify-contract.component';

@Component({
  selector: 'app-pending-contracts',
  templateUrl: './pending-contracts.component.html',
  styleUrls: ['./pending-contracts.component.sass']
})
export class PendingContractsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  
  displayedColumns: string[] = [
    "id",
    "title",
    "totalAmount",
    "startDate",
    "closingDate",
    "deskApproved",
    "financeApproved",
    "technicalApproved",
    "status",
    "createdBy",
    "createdTime",
    "actions"
  ];
  contracts: any[] = [];

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
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private needRequisitionService: NeedRequisitionService,
    private contractsService: ContractsService,
    private snackbar: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.getPendingContracts();
  }

  refresh() {
    this.getPendingContracts();
  }

  getPendingContracts() {
    this.contractsService
      .getPendingContracts()
      .subscribe(
        (result) => {
          this.contracts = result;

          console.log("Results ",result)

          if (this.contracts) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(this.contracts);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.contracts);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  navigateToRequestNeed() {
    this.router.navigate([
      "/departmental-users/need-management/need-requisition-form",
    ]);
  }

  updateTender(id) {
    console.log(233)
   this.router.navigate([`/procurement-admin/tender/update-tender/${id}`])
  }


  tenderDetails(row) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "600px";
    // dialogConfig.data = {
    //   data: row,
    // };
    // const dialogRef = this.dialog.open(TenderDetailsComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getPendingContracts();
    // });
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

  editContract(data) {
    console.log("editContract: ", data);
    this.router.navigate(
      ["/procurement-admin/contract-management/edit-contract"],
      {
        state: {
          selectedDetails: JSON.stringify(data),
        },
      }
    );
  }
  contractDetails(data){
    
    this.router.navigate(
      ["/procurement-admin/contract-management/view-contract"],
      {
        state: {
          selectedDetails: JSON.stringify(data),
        },
      }
    );
  }
  verify(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row
    };
    const dialogRef = this.dialog.open(VerifyContractComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      this.getPendingContracts();
    });
  
  }
}
