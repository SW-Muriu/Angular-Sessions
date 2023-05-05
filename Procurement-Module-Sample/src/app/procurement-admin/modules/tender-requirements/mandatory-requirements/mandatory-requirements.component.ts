import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderRequirementsService } from "src/app/procurement-admin/data/services/tender-requirements.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AddTenderRequirementComponent } from "../dialogs/add-tender-requirement/add-tender-requirement.component";
import { EditTenderRequirementComponent } from "../dialogs/edit-tender-requirement/edit-tender-requirement.component";

import Swal from "sweetalert2";

@Component({
  selector: 'app-mandatory-requirements',
  templateUrl: './mandatory-requirements.component.html',
  styleUrls: ['./mandatory-requirements.component.sass']
})
export class MandatoryRequirementsComponent implements OnInit {

  fetchedData: any;
  
  displayedColumns: string[] = [
    "id",
    "requirementcode",
    "category",
    "label",
    "inputType",
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
    private tenderRequirementsService: TenderRequirementsService,
    private tokenService: TokenStorageService,
    private snackbar: SnackbarService
  ) { }


  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.getRequirements();

  }

  refresh() {
    this.getRequirements();
  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRequirements() {
    this.tenderRequirementsService.getMandatoryRequirements().subscribe(
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

  addRequirement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: 'Mandatory'
    };
    const dialogRef = this.dialog.open(AddTenderRequirementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRequirements();
    });

  }
  

  editRequirement(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: 'Mandatory',
      selected: row
    };
    const dialogRef = this.dialog.open(EditTenderRequirementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getRequirements();
    });

  }


  deleteRequirement(data) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.tenderRequirementsService.deleteRequirement(data.id).subscribe(
          (res) => {
            this.getRequirements();
            this.snackbar.showNotification(
              "snackbar-success",
              "Tender requirement deleted successfully!"
            );
          },
          (err) => {
            console.log(err);
            this.snackbar.showNotification("snackbar-success", err);
          }
        );
        //Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

}
