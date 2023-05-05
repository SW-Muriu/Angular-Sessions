import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { RfqApplicationService } from "src/app/data/services/supplier/rfq-application.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {
  SelectedFiles,
  FilesService,
} from "src/app/suppliers/data/fileconversion/files.service";

const RFQ_DETAILS = "rfq-details";

@Component({
  selector: "app-update-pending-quatation",
  templateUrl: "./update-pending-quatation.component.html",
  styleUrls: ["./update-pending-quatation.component.sass"],
})
export class UpdatePendingQuatationComponent
  extends BaseComponent
  implements OnInit
{
  bidRfqForm: FormGroup;
  dyForm: FormGroup;
  currentUser: any;
  user: any;
  quotation: any;
  rfqParticulars: any[] = [];
  supplierDetails: any;

  announcementId: number;
  fetchedData: any;
  isLoading: boolean = false;

  isFileDataLoading: boolean = true;

  generalResponse: any = "";
  withfiles: any[] = [];
  particulars: any[] = [];
  routeState: any;
  rfq: any;
  taxCategories: any[] = [
    { code: 16, name: "A: Standard (16%)" },
    { code: 0, name: "B: Zero (0%)" },
    { code: 0, name: "C: Exempt (-)" },
    { code: 8, name: "E: Excise Duty" },
    { code: 12, name: "Over the Top Service (OTT)" },
    { code: 6, name: "Stamp Duty" },
    { code: 10, name: "Local Hotel Service Tax" },
    { code: 4, name: "UCC Levy" },
    { code: 3, name: "Others" },
  ];
  taxRate: number = 0;
  formIndex: number;
  grossAmount: number = 0;
  taxAmount: number = 0;
  netAmount: number = 0;
  discount: number = 0;

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ filedetails: this.rows });

  currSupplierid: any;
  currFile: string;
  currFilename: any;
  currFiletype: any;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenService: TokenStorageService,
    private filesService: FilesService,
    private rfqApplication: RfqApplicationService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        console.log("Router State", this.routeState);
        console.log("Parsed", JSON.parse(this.routeState.quotation));
        this.rfq = this.routeState.quotation
          ? JSON.parse(this.routeState.quotation)
          : "";

        this.saveRfqDetails(this.rfq);
      }
    }

    console.log("RFQ DETAILS", this.rfq);
  }

  ngOnInit(): void {
    this.bidRfqForm = this.createBidRfqForm();

    this.recoverRfqDetailsOnReload();

    this.currentUser = this.tokenService.getUser().username;

    this.user = this.tokenService.getUser();

    if (this.rfq) {
      this.bidRfqForm.patchValue({
        rfqid: this.rfq.id,
        rfqtitle: this.rfq.rfqtitle,
        supplieremail: this.rfq.supplieremail,
        supplierid: this.rfq.supplierid,
        suppliername: this.rfq.suppliername,
        id: this.rfq.id,
        grossbid: this.rfq.grossbid,
        netbid: this.rfq.netbid,
        status:this.rfq.status,
        reason: this.rfq.reason,
        applicationstatusreceived: this.rfq.applicationstatusreceived,
        modifiedby: this.rfq.modifiedby,
        createdon: this.rfq.createdon,
        reviewedon: this.rfq.reviewedon,
        reviewedby: this.rfq.reviewedby,
      });

      this.particulars = this.rfq.rfqSupplierParticulars;

      console.log("Particulars ", this.particulars);

      this.particulars.forEach((particular) => {

        console.log("Particular ", particular);

        this.t.push(
          (this.dyForm = this.fb.group({
            id: particular.id,
            item: particular.item,
            description: particular.description,
            quantity: particular.quantity,
            taxRate: particular.taxRate,
            discountrate: particular.discountrate,
            discountamount: particular.discountamount,
            unitPrice: particular.unitPrice,
            taxAmount: particular.taxAmount,
            netAmount: particular.netAmount,
            totalPrice: particular.totalPrice,
          }))
        );

        this.netAmount += particular.netAmount,

        this.taxAmount += particular.taxAmount,

        this.grossAmount += particular.totalPrice

        this.discount += particular.discountamount;

        console.log("Net Amount ", this.netAmount);

        console.log("Tax Amount ", this.taxAmount);

        console.log("Gross Amount ", this.grossAmount);

        console.log("Discount ", this.discount);
      });
    }
  }

  saveRfqDetails(quotation) {
    sessionStorage.removeItem(RFQ_DETAILS);
    sessionStorage.setItem(RFQ_DETAILS, JSON.stringify(quotation));
  }

  getRfqDetails() {
    return sessionStorage.getItem(RFQ_DETAILS);
  }

  removeRfqDetails() {
    sessionStorage.removeItem(RFQ_DETAILS);
  }

  recoverRfqDetailsOnReload() {
    const recoveredRfqDetails = JSON.parse(this.getRfqDetails());

    if (recoveredRfqDetails) {
      this.rfq = recoveredRfqDetails;
    }
  }

  createBidRfqForm(): FormGroup {
    return this.fb.group({
      rfqid: [""],
      rfqtitle: ["", [Validators.required]],
      supplieremail: ["", [Validators.required]],
      supplierid: [""],
      suppliername: ["", [Validators.required]],
      id: [""],
      grossbid: [""],
      netbid: [""],
      status: [""],
      reason: [""],
      applicationstatusreceived: [""],
      modifiedby: null,
      createdon: [""],
      reviewedon: [""],
      reviewedby:[""],
      rfqDocuments: new FormArray([]),
    });
  }
  get f() {
    return this.bidRfqForm.controls;
  }
  get t() {
    return this.f.rfqDocuments as FormArray;
  }

  specifyUnitPrice(event: any, i: any) {
    let form = this.t.at(i);

    this.dyForm == this.t.at(i);

    let quantity = 0;
    let unitPrice = 0;
    let taxRate = 0;
    let discountrate = 0;
    let totalPrice = 0;
    let discount = 0;
    let taxAmount = 0;
    let netAmount = 0;

    console.log("i ", i);
    console.log("dy Form", form.value);

    if (!form.value.quantity) {
      quantity = 1;

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    } else {
      quantity = parseInt(form.value.quantity);

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    }

    form.patchValue({
      totalPrice: totalPrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
      discountamount: discount.toFixed(2),
    });

    this.calculate();
  }

  specifyDiscountRate(event: any, i: any) {
    let form = this.t.at(i);

    this.dyForm == this.t.at(i);

    let quantity = 0;
    let unitPrice = 0;
    let taxRate = 0;
    let discountrate = 0;
    let totalPrice = 0;
    let discount = 0;
    let taxAmount = 0;
    let netAmount = 0;

    console.log("i ", i);
    console.log("dy Form", form.value);

    if (!form.value.quantity) {
      quantity = 1;

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    } else {
      quantity = parseInt(form.value.quantity);

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    }

    form.patchValue({
      totalPrice: totalPrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
      discountamount: discount.toFixed(2),
    });

    this.calculate();
  }

  selectTax(event: any, i: any) {
    let form = this.t.at(i);

    this.dyForm == this.t.at(i);

    let quantity = 0;
    let unitPrice = 0;
    let taxRate = event.value;
    let discountrate = 0;
    let totalPrice = 0;
    let discount = 0;
    let taxAmount = 0;
    let netAmount = 0;

    console.log("i ", i);
    console.log("dy Form", form.value);

    if (!form.value.quantity) {
      quantity = 1;

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    } else {
      quantity = parseInt(form.value.quantity);

      unitPrice = Number(form.value.unitPrice);

      if (!form.value.discountrate) {
        discount = 0;
      } else {
        discountrate = Number(form.value.discountrate);

        discount = (discountrate / 100) * unitPrice;
      }

      unitPrice = unitPrice - discount;

      netAmount = quantity * unitPrice;

      if (!form.value.taxRate) {
        taxAmount = 0;
      } else {
        taxRate = Number(form.value.taxRate);

        taxAmount = (taxRate / 100) * unitPrice;
      }

      unitPrice = unitPrice + taxAmount;

      totalPrice = quantity * unitPrice;
    }

    form.patchValue({
      totalPrice: totalPrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
      discountamount: discount.toFixed(2),
    });

    this.calculate();
  }

  calculate() {
    this.taxAmount = 0;
    this.netAmount = 0;
    this.grossAmount = 0;

    for (let i = 0; i < this.t.length; i++) {
      let form = this.t.at(i);

      const taxAmount = form.value.taxAmount;

      const netAmount = form.value.netAmount;

      const grossAmount = form.value.totalPrice;

      const discountAmount = form.value.discountamount;

      this.taxAmount += Number(taxAmount);

      this.netAmount += Number(netAmount);

      this.grossAmount += Number(grossAmount);

      this.discount += Number(discountAmount);
    }
  }

  sendQuatation() {
    console.log("RFQ Format: ", this.bidRfqForm.value);
    this.rfqApplication.updateRFQBidApplication(this.bidRfqForm.value).subscribe(
      (res) => {
        console.log("RFQ Format", this.bidRfqForm.value);

        this.snackbar.showNotification("snackbar-success", res.message);

        console.log(res);

        this.router.navigate(["/suppliers/rfqs/pending-rfq-applications"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.router.navigate(["/suppliers/rfqs/open-rfqs/"]);
  }
}
