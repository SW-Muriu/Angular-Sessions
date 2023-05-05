import { SelectionModel } from "@angular/cdk/collections";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DomSanitizer } from "@angular/platform-browser";
import { PendingRfqsComponent } from "src/app/financial-evaluators/modules/rfqs/pages/all/pending-rfqs/pending-rfqs.component";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-rfq-application-details",
  templateUrl: "./rfq-application-details.component.html",
  styleUrls: ["./rfq-application-details.component.sass"],
})
export class RfqApplicationDetailsComponent
  extends BaseComponent
  implements OnInit
{
  displayedColumns: string[] = [
    "id",
    "item",
    // "taxAmount",
    "taxRate",
    "discountrate",
    // "discountamount",
    "quantity",
    "unitPrice",
    "totalPrice",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  rfqApplicationDetails: any;
  rfqSupplierParticulars: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PendingRfqsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private sanitizer: DomSanitizer
  ) {
    super();

    console.log(this.data);
  }

  ngOnInit(): void {
    this.rfqApplicationDetails = this.data.data;

    this.rfqSupplierParticulars = this.rfqApplicationDetails.rfqSupplierParticulars;

    console.log("RFQ APPLICATION", this.rfqApplicationDetails);

    console.log("RFQ SUPPLIER PARTICULARS ", this.rfqSupplierParticulars)

    if(this.rfqSupplierParticulars.length > 0){
      this.dataSource = new MatTableDataSource<any>(this.rfqSupplierParticulars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }

  downloadDocument(rfqApplication) {
    console.log("RFQ Application", rfqApplication.data);

    const byteArray = new Uint8Array(
      atob(rfqApplication.data)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    const blob = new Blob([byteArray], { type: "application/pdf" });

    console.log("Byte Array", blob);

    // console.log(blob)

    // // Here is your URL you can use
    // const url = window.URL.createObjectURL(blob);

    // // i.e. display the PDF content via iframe
    // document.querySelector("iframe").src = url;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
