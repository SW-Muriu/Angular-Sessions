import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subscription, takeUntil } from "rxjs";
import { ExpenseService } from "src/app/admin/data/services/expense.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { CommitteeService } from "src/app/data/services/admin/committee.service";
import { NeedRequisitionService } from "src/app/data/services/need-requisition/need-requisition.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingNeedsComponent } from "../pending-needs/pending-needs.component";

@Component({
  selector: "app-update-need",
  templateUrl: "./update-need.component.html",
  styleUrls: ["./update-need.component.sass"],
})
export class UpdateNeedComponent extends BaseComponent implements OnInit {
  updateNeedform: FormGroup;
  dyForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  accounts: any;

  currentUser: any;
  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;
  has_exp = false;
  need: any;
  needParticulars: any[] = [];
  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PendingNeedsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private needRequisitionSevice: NeedRequisitionService,
    public dialog: MatDialog,
    private tokenService: TokenStorageService,
    private tenderCategoriesService: TenderCategoriesService
  ) {
    super();
    this.need = data.data;
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;

    this.getTenderCategories();

    this.updateNeedform = this.updateCostCenterForm();
    this.onInitDynamicForm();
  }

  updateCostCenterForm(): FormGroup {
    return this.fb.group({
      id: [this.need.id],
      address: [this.need.address],
      contacts: [this.need.contacts],
      manager: [this.need.manager],
      need: [this.need.need],
      postedBy: [this.need.postedBy],
      postedTime: [this.need.postedTime],
      category: [this.need.category],
      despcription: [this.need.despcription],
      reqParticulars: new FormArray([]),
      requestDate: [this.need.requestDate],
      type: [this.need.type],
    });
  }
  get f() {
    return this.updateNeedform.controls;
  }
  get t() {
    return this.f.reqParticulars as FormArray;
  }

  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
        itemName: [""],
        itemQuantity: [""],
        itemDescription: [""],
        totalPrice: [""],
        unitPrice: [""],
      }))
    );
  }
  onRemoveField(i: any) {
    this.t.removeAt(i);
  }

  onInitDynamicForm() {
    this.need = this.need.reqParticulars;
    for (let i = 0; i < this.need.length; i++) {

      this.onAddFeedField(this.need[i]);
    }
  }

  specifyUnitPrice(event: any, i: any){
    let form = this.t.at(i);

    this.dyForm == this.t.at(i)

    console.log("i ", i);
  console.log("dy Form", form.value)

    if(!form.value.itemQuantity){

      let quantity = 1;

      let unitPrice = Number(form.value.unitPrice);

      let totalPrice = (quantity * unitPrice).toFixed(2);

     form.patchValue({
      totalPrice: totalPrice
     })

    }else{
      let quantity = parseInt(form.value.itemQuantity);

      let unitPrice = Number(form.value.unitPrice);

      let totalPrice = (quantity * unitPrice).toFixed(2);

      form.patchValue({
        totalPrice: totalPrice
       })
    }
  
}

specifyQuantity(event: any, i: any){
  let form = this.t.at(i);

  console.log("i ", i);
  console.log("dy Form", form.value)

  if(!form.value.unitPrice){

    let quantity = Number(form.value.itemQuantity);

    let unitPrice = 0;

    let totalPrice = (quantity * unitPrice).toFixed(2);

   form.patchValue({
    totalPrice: totalPrice
   })

  }else{
    let quantity = Number(form.value.itemQuantity);

    let unitPrice = Number(form.value.unitPrice);

    let totalPrice = (quantity * unitPrice).toFixed(2);

    form.patchValue({
      totalPrice: totalPrice
     })
  }
}


  onAddFeedField(i: any) {
    this.t.push(
      (this.dyForm = this.fb.group({
        itemName: [i.itemName],
        itemQuantity: [i.itemQuantity],
        itemDescription: [i.itemDescription],
        totalPrice: [i.totalPrice],
        unitPrice: [i.unitPrice],
      }))
    );
    console.log("dyForm: ", this.dyForm.value);
  }
  getSelectedExpense(event: any) {
    console.log("expenseItem: ", event.value);
    this.selectedExpenseId = event.value;
  }

  getTenderCategories() {
    this.tenderCategoriesService.getTenderCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.categories = res;

          console.log("Categories ", this.categories)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateNeed() {
    console.log("Cost center: ", this.updateNeedform.value);
    this.needRequisitionSevice.updateNeed(this.updateNeedform.value).subscribe(
      (res) => {
        this.snackbar.showNotification(
          "snackbar-success",
          "Cost center updated successfully !"
        );
        this.dialogRef.close();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
