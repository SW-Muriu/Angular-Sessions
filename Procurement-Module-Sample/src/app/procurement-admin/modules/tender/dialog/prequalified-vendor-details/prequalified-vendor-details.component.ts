import { SelectionModel } from "@angular/cdk/collections";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { TenderAdvertService } from "src/app/data/services/procurement-admin/tender-advert.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingTendersComponent } from "../../all/pending-tenders/pending-tenders.component";

@Component({
  selector: "app-prequalified-vendor-details",
  templateUrl: "./prequalified-vendor-details.component.html",
  styleUrls: ["./prequalified-vendor-details.component.sass"],
})
export class PrequalifiedVendorDetailsComponent
  extends BaseComponent
  implements OnInit
{
  displayedColumns: string[] = [
    "id",
    "tendercategory",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  prequalifiedSupplier: any;
  supplierId: number;
  supplierDetails: any;
  areasOfInterest: any[] = [];
  isLoading: boolean = true

  constructor(
    public dialogRef: MatDialogRef<PendingTendersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tenderAdvertService: TenderAdvertService
  ) {
    super();

    console.log(this.data);
  }

  ngOnInit(): void {
    this.prequalifiedSupplier = this.data.data;

    this.supplierId = this.prequalifiedSupplier.id;

    this.getSupplierDetailsById(this.supplierId)

    console.log("Supplier Id", this.supplierId);

    console.log("DATA", this.data.data);
  }

  getSupplierDetailsById(id) {
    this.tenderAdvertService
      .getSupplierDetails(id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.supplierDetails = result;

          this.supplierDetails;

          this.areasOfInterest = this.supplierDetails.areasofinterest;

          console.log("Areas of interests", this.areasOfInterest)

          if(this.areasOfInterest){
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(this.areasOfInterest);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log("Supplier Details", this.supplierDetails)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
