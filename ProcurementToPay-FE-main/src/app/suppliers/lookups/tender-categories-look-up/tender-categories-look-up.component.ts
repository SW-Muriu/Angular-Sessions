import { SelectionModel } from "@angular/cdk/collections";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { GeneralComponent } from "../../modules/parameters/general/general.component";


@Component({
  selector: "app-tender-categories-look-up",
  templateUrl: "./tender-categories-look-up.component.html",
  styleUrls: ["./tender-categories-look-up.component.sass"],
})
export class TenderCategoriesLookUpComponent implements OnInit {
  displayedColumns: string[] = ["select", "id","name", "code", ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;

  selection = new SelectionModel<any>(true, []);

  categoryDetails: any;
  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  categoriesArray: any[] = [];

  tendersCats: any;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<GeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tenderCategoryService: TenderCategoriesService
  ) {}

  ngOnInit(): void {
    this.getData();

    this.categoriesArray = this.data.selected;

    if (this.categoriesArray.length !== 0) {
      this.filter();
      console.log("filter by: ", this.categoriesArray);
    }
  }
  getData() {
    this.tenderCategoryService.getTenderCategories().subscribe(
      (result) => {
        this.tendersCats = result;

        console.log("Results ", result);

        if (this.tendersCats) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(this.tendersCats);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        console.log(this.tendersCats);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   // if (this.expensesArray.length !== 0) {
  //   //   this.dataSourceFilteredList.forEach((item) => {
  //   //     this.selection = new SelectionModel<any>(true, [
  //   //       this.dataSource.data[item],
  //   //     ]);
  //   //   });
  //   // }

  //   console.log("Finally: ", this.dataSourceFilteredList);

  // }

  filter() {
    //let storeId = [1, 2, 3];
    this.dataSource.data.forEach((element) => {
      this.categoriesArray.forEach((item) => {
        if (item === element.id) {
          // this.dataSourceFilteredList.push(this.dataSource.data.indexOf(element));
          this.selection.select(element);
        }
      });
    });

    console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //******************************************************************************************************
  //Select expense

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  expSelected() {
    this.atleastOneSelected = true;
    this.selectedRows = this.selection.selected;

    console.log("this.selectedRows: ", this.selectedRows);
  }
  proceed() {
    this.dialogRef.close({ event: "close", data: this.selectedRows });

    //   console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close({ event: "close", data: this.selectedRows });
  }
  public confirmAdd(): void {}
}
