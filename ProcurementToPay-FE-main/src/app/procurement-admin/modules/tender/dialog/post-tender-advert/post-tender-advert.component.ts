import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/admin/data/services/localstorage.service';
import { RfqsService } from 'src/app/data/services/financial-evaluator/rfqs.service';
import { BiddersService } from 'src/app/data/services/procurement-admin/bidders.service';
import { TenderAdvertService } from 'src/app/data/services/procurement-admin/tender-advert.service';
import { TenderPreperationService } from 'src/app/data/services/procurement-admin/tender-preperation.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddTenderComponent } from '../add-tender/add-tender.component';
import { PrequalifiedVendorDetailsComponent } from '../prequalified-vendor-details/prequalified-vendor-details.component';
import { TenderAdvertDetailsComponent } from '../tender-advert-details/tender-advert-details.component';

@Component({
  selector: 'app-post-tender-advert',
  templateUrl: './post-tender-advert.component.html',
  styleUrls: ['./post-tender-advert.component.sass']
})
export class PostTenderAdvertComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "id",
    "companyname",
    "country",
    "phonenumber",
    "physicaladdress",
    "supplylocations",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  subscription!: Subscription;
  accounts: any;

  selectFeedback: " ";
  billInfo: any;
  isLoading: boolean = true;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  centersList: any;
  selectedCenter: any;

  selected: boolean = false;
  selectedRows: any;

  prequalifiedVendors: any[] = [];
  selectedSuppliers: any[] = [];
  rfqCode: any;
  categoryCode: any;
  ids: any[] = [];



  statusForm: FormGroup;
  statusTypes: any[] = [
    { name: "Approved", value: "Approved" },
    { name: "Rejected", value: "Rejected" },
  ];
  rejected: boolean = false;
  currentUser: any;
  role: any;
  username: any;
  deskEvaluator: boolean = false;
  financialEvaluator: boolean = false;
  technicalEvaluator: boolean = false;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private rfqsService: RfqsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddTenderComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private tenderAdvertService: TenderAdvertService,
    private biddersService: BiddersService,
    private datepipe: DatePipe
  ) {
    super();
    this.Data = data.data;

    console.log("Data ", data)

    this.rfqCode = this.Data.rfqCode;

    this.categoryCode = this.Data.categorycode;

    console.log("Category Code", this.categoryCode)
    
  }
  formControl = new FormControl("", [Validators.required]);

  ngOnInit(): void {
    console.log("RFQ CODE", this.rfqCode);

    console.log("CATEGORY CODE", this.categoryCode);

    this.statusForm = this.createStatusForm();
    
   

    this.getAllsuppliers();

  }

  createStatusForm(): FormGroup {
    return this.fb.group({
      advertId: [this.Data.id],
      startdate: [""],
      closeDate: [""]
    });
  }

  statusSelected(selectedStatus: any) {
    if (selectedStatus.value == "Approved") {
      this.rejected = false;
      this.statusForm.patchValue({ reason: "-" });
    } else {
      this.rejected = true;
      this.statusForm.patchValue({ reason: "" });
    }
  }


 

  getAllsuppliers() {
    this.biddersService
      .getAllBidders()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.prequalifiedVendors = result;

          console.log("Results ", result);

          if (this.prequalifiedVendors) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource<any>(
              this.prequalifiedVendors
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          console.log(this.prequalifiedVendors);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  vendorDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(
      PrequalifiedVendorDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  postRFQ() {
    let fromDate = this.datepipe.transform(
      this.statusForm.value.startdate,
      "yyyy-MM-ddTHH:mm:ss"
    );
    let toDate = this.datepipe.transform(
      this.statusForm.value.closeDate,
      "yyyy-MM-ddTHH:mm:ss"
    );    


    const params = new HttpParams()
      .set("advertId", this.statusForm.value.advertId)
      .set("startdate", fromDate)
      .set("closeDate", toDate)

    console.log("Selected Suppliers", this.selectedSuppliers);

    this.ids = [];

    console.log("RFQ CODE", this.rfqCode)

    this.selectedSuppliers.forEach((supplier) => {
      this.ids.push(Number(supplier.supplierid));
    });

    console.log("IDs ", this.ids)
    
    this.tenderAdvertService
      .postAdvert(this.ids, params)
      .pipe(takeUntil(this.subject))
      .subscribe((result) => {
        console.log(result)
        this.snackbar.showNotification("snackbar-success", "RFQ posted successfully !");

        this.dialogRef.close();
      }, err => {
        console.log(err)

        this.dialogRef.close();
      });
      
    // if (this.selectedSuppliers.length > 0) {
    //   this.selectedSuppliers.forEach((supplier) => {
    //     this.ids.push(Number(supplier.supplierid));
    //   });

    //   console.log("IDs ", this.ids)
      
    //   this.tenderAdvertService
    //     .postAdvert(this.ids, params)
    //     .pipe(takeUntil(this.subject))
    //     .subscribe((result) => {
    //       console.log(result)
    //       this.snackbar.showNotification("snackbar-success", "RFQ posted successfully !");

    //       this.dialogRef.close();
    //     }, err => {
    //       console.log(err)

    //       this.dialogRef.close();
    //     });
    // }else {
    //   this.snackbar.showNotification("snackbar-danger", "Please specify suppliers !")
    // }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //******************************************************************************************************
  // Even distribution calculation

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

  checkboxActive() {
    this.selectedRows = this.selection.selected;

    this.selectedSuppliers = this.selectedRows;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTermsAndConditions() {
    this.dialogRef.close({ event: "close", data: this.selectedRows });

    console.log("Selected Rows", this.selectedRows);
  }
}
