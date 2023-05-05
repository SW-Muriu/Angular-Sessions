import { SelectionModel } from "@angular/cdk/collections";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";

import Swal from "sweetalert2";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderService } from "src/app/procurement-admin/data/services/tenders.service";
import { AddTenderComponent } from "../../dialog/add-tender/add-tender.component";
import { EditTenderComponent } from "../../dialog/edit-tender/edit-tender.component";

@Component({
  selector: 'app-tender-categories',
  templateUrl: './tender-categories.component.html',
  styleUrls: ['./tender-categories.component.sass']
})
export class TenderCategoriesComponent implements OnInit {

  displayedColumns: string[] = ["id", "code", "name", "type","actions"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;

  formData: any;

  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private tenderService: TenderService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData() {
    this.subscription = this.tenderService
      .getTenders()
      .subscribe((res) => {
        this.data = res;
        console.log("Tender categories =", res);
        if (this.data) {
          this.isLoading = false;
        }

        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  refresh() {
    this.getData();
  }

  addParameter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: "data",
    };

    const dialogRef = this.dialog.open(AddTenderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  onSelect(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: data,
    };

    const dialogRef = this.dialog.open(EditTenderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  customWithFunction(data) {
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
        this.tenderService.deleteTender(data.id).subscribe(
          (res) => {
            this.getData();
            this.snackbar.showNotification(
              "snackbar-success",
              "Tender category deleted successfully!"
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
