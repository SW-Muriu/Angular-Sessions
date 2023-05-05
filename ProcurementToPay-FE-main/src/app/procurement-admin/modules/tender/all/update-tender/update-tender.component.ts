import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { MatDialog,  } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-update-tender",
  templateUrl: "./update-tender.component.html",
  styleUrls: ["./update-tender.component.sass"],
})
export class UpdateTenderComponent extends BaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  routeState: any;
  selecBill: any;
  billData: any;
  submit;
  type;
  isLoading: boolean;
  selected: any;

  displayedColumns: string[] = [
    "select",
    "item_name",
    "department",
    "item_quantity",
    "unit_price",
    "total_price",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild("paginatorCostCenters") paginatorCCs: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);

  dataSourcePointing!: MatTableDataSource<any>;
  @ViewChild("paginatorPointingDetails") paginatorPointing: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPointing!: MatSort;

  finalFormEven: FormGroup;
  finalFormCustom: FormGroup;

  evenHolderForm: FormGroup;

  costCenterForm: FormGroup;
  evenCostCenterForm: FormGroup;
  dyForm: FormGroup;
  tenderForm: FormGroup;
  tendeAdditionalDetailsForm: FormGroup;
  termsAndConditionsForm: FormGroup;
  mandatoryRequirementsForm: FormGroup;
  technicalRequirementsForm: FormGroup;
  financialRequirementsForm: FormGroup;
  documentsForm: FormGroup;
  startDate = new Date();
  selectedNeedCategory: any;
  items: any[] = [];
  categories: any[] = [];
  needs: any[] = [];
  selectedRows: any;
  needIds: any[] = [];
  user: any;
  tenderId: number;
  tender: any;
  tenderParticulars: any[] = [];
  termsAndConditions: any[] = [];
  mandatoryRequirementsArray: any[] = [];
  technicalRequirementsArray: any[] = [];
  financialRequirementsArray: any[] = [];
  tenderDocumentsArray: any[] = [];

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";
  hasBidFee: boolean = false;

  tenderitems: any[] = [];
  typesOfTender: string[] = ["Open", "Closed"];
  evaluationCreteria: string[] = [
    "Determination of Responsiveness",
    "Detailed Technical Examination",
    "Financial Evaluation",
    "Combination of Technical, Tender Sums Comparison and Financial Store",
    "Post Qualification: Due Diligence",
  ];
  procurementTypes: string[] = [
    "Strategic Procurement",
    "Supportive Procurement",
    "Commercial Procurement",
    "Clerical Procurement",
  ];
  bidTypes: string[] = ["Auction Bids", "Online Bids", "Sealed Bids"];

  displayedColumnss: string[] = [
    "accountNo",
    "accountName",
    "amount",
    "parttranstype",
    "narration",
    "actions",
  ];

  dataSource2!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("paginatorLegal") paginatorLegal: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private tenderCategoriesService: TenderCategoriesService,
    private tenderPreperationService: TenderPreperationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.subject)).subscribe(
      (param) => {
        this.tenderId = param.id;
      },
      (err) => {
        console.log(err);
      }
    );

    this.user = this.tokenStorageService.getUser().username;

    console.log(this.user);

    this.getTendercategories();

    this.getTenderById(this.tenderId);

    this.tenderForm = this.createTenderForm();

    this.tendeAdditionalDetailsForm = this.createTenderAdditionalDetailsForm();
  }

  createTenderForm(): FormGroup {
    return this.fb.group({
      id: [],
      bidFee: [""],
      budget: [""],
      catagory: [""],
      closingDate: [""],
      communicationMode: [""],
      postedBy: [""],
      startDate: [""],
      tenderDescription: [""],
      tenderNo: [""],
      title: [""],
      bidType: [""],
      categorycode: [""],
      evaluationcriteria: [""],
      procurementtype: [""],
      procuringentity: [""],
      withBidFee: [""],
      tendertype: [""],
      modifiedBy: [this.user],
      modifiedTime: [new Date()],
      postedStatus: [""],
      postedTime: [""],
      roleDeskApprovalStatus: [""],
      roleFinancialApprovalStatus: [""],
      roleTechnicalApprovalStatus: [""],
      status: [""],
      trackingstatus: [""],
      verifiedBy: [""],
      verifiedTime: [""],
      biddingstatus: [""],
      tenderParticulars: new FormArray([]),
      termsandCondditions: new FormArray([]),
      tenderDocuments: new FormArray([]),
      mandatoryReqsList: new FormArray([]),
      technicalReqsList: new FormArray([]),
      financialReqsList: new FormArray([]),
    });
  }

  createTenderAdditionalDetailsForm(): FormGroup {
    return this.fb.group({
      bidFee: ["", [Validators.required]],
      budget: ["", [Validators.required]],
      catagory: ["", [Validators.required]],
      closingDate: ["", [Validators.required]],
      communicationMode: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      tenderDescription: ["", [Validators.required]],
      tenderNo: ["", [Validators.required]],
      title: ["", [Validators.required]],
      withBidFee: ["No", [Validators.required]],
      tendertype: ["", [Validators.required]],
      bidType: ["", [Validators.required]],
      categorycode: ["", [Validators.required]],
      evaluationcriteria: ["", [Validators.required]],
      procurementtype: ["", [Validators.required]],
      procuringentity: ["", [Validators.required]],
      termsAndConditions: ["", [Validators.required]],
      mandatoryRequirements: ["", [Validators.required]],
      technicalRequirements: ["", [Validators.required]],
      financialRequirements: ["", [Validators.required]],
    });
  }

  get f() {
    return this.tenderForm.controls;
  }
  get t() {
    return this.f.tenderParticulars as FormArray;
  }

  get termsAndConditionsFormControl() {
    return this.f.termsandCondditions as FormArray;
  }

  get tenderDocuments() {
    return this.f.tenderDocuments as FormArray;
  }

  get mandatoryRequirements() {
    return this.f.mandatoryReqsList as FormArray;
  }

  get technicalRequirements() {
    return this.f.technicalReqsList as FormArray;
  }

  get financialRequirementsList() {
    return this.f.financialReqsList as FormArray;
  }

  getTenderById(id) {
    this.tenderParticulars = [];
    this.termsAndConditions = [];
    this.mandatoryRequirementsArray = [];
    this.technicalRequirementsArray = [];
    this.financialRequirementsArray = [];
    this.tenderDocumentsArray = [];

    this.tenderPreperationService
      .getTenderById(id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          this.tender = result;

          if (this.tender.withBidFee == "Yes") {
            this.hasBidFee = true;
          } else {
            this.hasBidFee = false;
          }

          this.tendeAdditionalDetailsForm.patchValue({
            bidFee: this.tender.bidFee,
            budget: this.tender.budget,
            catagory: this.tender.catagory,
            closingDate: this.tender.closingDate,
            communicationMode: this.tender.communicationMode,
            tenderDescription: this.tender.tenderDescription,
            tenderNo: this.tender.tenderNo,
            title: this.tender.title,
            withBidFee: this.tender.withBidFee,
            tendertype: this.tender.tendertype,
            bidType: this.tender.bidType,
            categorycode: this.tender.categorycode,
            evaluationcriteria: this.tender.evaluationcriteria,
            procurementtype: this.tender.procurementtype,
            procuringentity: this.tender.procuringentity,
            termsAndConditions: `${this.tender.termsandCondditions.length} terms and conditions selected`,
            mandatoryRequirements: `${this.tender.mandatoryReqsList.length} mandatory requirements seleted`,
            technicalRequirements: `${this.tender.technicalReqsList.length} technical requirements selected`,
            financialRequirements: `${this.tender.financialReqsList.length} financial requirements selected`,
          });

          this.tenderParticulars = this.tender.tenderParticulars;

          this.tenderParticulars.forEach((tenderItem) => {
            this.t.push(
              (this.dyForm = this.fb.group({
                id: [tenderItem.id],
                itemName: [tenderItem.itemName],
                itemQuantity: [tenderItem.itemQuantity],
                itemDescription: [tenderItem.itemDescription],
                totalPrice: [tenderItem.totalPrice],
                unitPrice: [tenderItem.unitPrice],
              }))
            );
          });

          this.termsAndConditions = this.tender.termsandCondditions;

          this.termsAndConditions.forEach((term) => {
            this.termsAndConditionsFormControl.push(
              (this.termsAndConditionsForm = this.fb.group({
                description: term.description,
                id: term.id,
                title: term.title,
              }))
            );
          });

          this.mandatoryRequirementsArray = this.tender.mandatoryReqsList;

          this.mandatoryRequirementsArray.forEach((requirement) => {
            this.mandatoryRequirements.push(
              (this.mandatoryRequirementsForm = this.fb.group({
                id: requirement.id,
                mandatoryRequirementId: requirement.mandatoryRequirementId,
              }))
            );
          });

          this.technicalRequirementsArray = this.tender.technicalReqsList;

          this.technicalRequirementsArray.forEach((requirement) => {
            this.technicalRequirements.push(
              (this.technicalRequirementsForm = this.fb.group({
                technicalRequirementId: requirement.technicalRequirementId,
                id: requirement.id,
              }))
            );
          });

          this.financialRequirementsArray = this.tender.financialReqsList;

          this.financialRequirementsArray.forEach((requirement) => {
            this.financialRequirementsList.push(
              (this.financialRequirementsForm = this.fb.group({
                id: requirement.id,
                financialRequirementId: requirement.id,
              }))
            );
          });

          this.tenderDocumentsArray = this.tender.tenderDocuments;

          console.log("Tender Documents", this.tenderDocumentsArray);

          this.tenderDocumentsArray.forEach((document) => {
            this.tenderDocuments.push(
              (this.documentsForm = this.fb.group({
                filename: document.filename,
                file: document.file,
                fileType: document.fileType,
                id: document.id,
              }))
            );
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTendercategories() {
    this.tenderCategoriesService
      .getTenderCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log("Tender categories", result);

          this.categories = result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  includeBidFee(event: any) {
    if (event.value == "Yes") {
      this.hasBidFee = true;
    } else if (event.value == "No") {
      this.hasBidFee = false;
    }
  }

  specifyUnitPrice(event: any, i: any) {
    let form = this.t.at(i);

    this.dyForm == this.t.at(i);

    console.log("i ", i);
    console.log("dy Form", form.value);

    if (!form.value.itemQuantity) {
      let quantity = 1;

      let unitPrice = Number(form.value.unitPrice);

      let totalPrice = (quantity * unitPrice).toFixed(2);

      form.patchValue({
        totalPrice: totalPrice,
      });
    } else {
      let quantity = parseInt(form.value.itemQuantity);

      let unitPrice = Number(form.value.unitPrice);

      let totalPrice = (quantity * unitPrice).toFixed(2);

      form.patchValue({
        totalPrice: totalPrice,
      });
    }
  }

  specifyQuantity(event: any, i: any) {
    let form = this.t.at(i);

    console.log("i ", i);
    console.log("dy Form", form.value);

    if (!form.value.unitPrice) {
      let quantity = Number(form.value.itemQuantity);

      let unitPrice = 0;

      let totalPrice = (quantity * unitPrice).toFixed(2);

      form.patchValue({
        totalPrice: totalPrice,
      });
    } else {
      let quantity = Number(form.value.itemQuantity);

      let unitPrice = Number(form.value.unitPrice);

      let totalPrice = (quantity * unitPrice).toFixed(2);

      form.patchValue({
        totalPrice: totalPrice,
      });
    }
  }

  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  prepareTender() {
    this.tenderForm.patchValue({
      id: this.tender.id,
      bidFee: this.tendeAdditionalDetailsForm.value.bidFee,
      budget: this.tendeAdditionalDetailsForm.value.budget,
      catagory: this.tendeAdditionalDetailsForm.value.catagory,
      closingDate: this.tendeAdditionalDetailsForm.value.closingDate,
      communicationMode:
        this.tendeAdditionalDetailsForm.value.communicationMode,
      postedTime: this.tendeAdditionalDetailsForm.value.postedTime,
      startDate: this.tendeAdditionalDetailsForm.value.startDate,
      tenderDescription:
        this.tendeAdditionalDetailsForm.value.tenderDescription,
      tenderNo: this.tendeAdditionalDetailsForm.value.tenderNo,
      title: this.tendeAdditionalDetailsForm.value.title,
      withBidFee: this.tendeAdditionalDetailsForm.value.withBidFee,
      tendertype: this.tendeAdditionalDetailsForm.value.tendertype,
      bidType: this.tendeAdditionalDetailsForm.value.bidType,
      categorycode: this.tendeAdditionalDetailsForm.value.categorycode,
      evaluationcriteria:
        this.tendeAdditionalDetailsForm.value.evaluationcriteria,
      procurementtype: this.tendeAdditionalDetailsForm.value.procurementtype,
      procuringentity: this.tendeAdditionalDetailsForm.value.procuringentity,
      modifiedTime: new Date(),
      postedStatus: this.tender.postedStatus,
      roleDeskApprovalStatus:  this.tender.roleDeskApprovalStatus,
      roleFinancialApprovalStatus:  this.tender.roleFinancialApprovalStatus,
      roleTechnicalApprovalStatus:  this.tender.roleTechnicalApprovalStatus,
      status:  this.tender.status,
      trackingstatus:  this.tender.trackingstatus,
      verifiedBy: this.tender.verifiedBy,
      verifiedTime:  this.tender.verifiedTime,
      biddingstatus:  this.tender.biddingstatus,
      postedBy: this.tender.postedBy
    });

    console.log("Tender Form", this.tenderForm.value);

    this.tenderPreperationService
      .updaTender(this.tenderForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (result) => {
          console.log(result);

          this.snackbar.showNotification("snackbar-success", "Tender updated successfully !")

          this.router.navigate(["/procurement-admin/tender/pending-tenders"]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onClick() {
    this.router.navigate(["/procurement-admin/tender/pending-tenders"]);
  }
}
