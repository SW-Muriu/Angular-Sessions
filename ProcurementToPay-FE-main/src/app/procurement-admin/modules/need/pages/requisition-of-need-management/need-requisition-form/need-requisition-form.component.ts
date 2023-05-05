import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { CommitteeService } from "src/app/data/services/admin/committee.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { takeUntil } from "rxjs";
import { AccountService } from "src/app/admin/modules/users/data/services/account.service";
import { NeedRequisitionService } from "src/app/data/services/need-requisition/need-requisition.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { TenderCategoriesService } from "src/app/data/services/procurement-admin/tender-categories.service";

@Component({
  selector: "app-need-requisition-form",
  templateUrl: "./need-requisition-form.component.html",
  styleUrls: ["./need-requisition-form.component.sass"],
})
export class NeedRequisitionFormComponent
  extends BaseComponent
  implements OnInit
{
  currentUser: any;
  user:any;
  username: string;
  userId: number;
  needRequisitionForm: FormGroup;
  dyForm: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private committeeService: CommitteeService,
    private needRequisitionService: NeedRequisitionService,
    private tokenStorageService: TokenStorageService,
    private tenderCategoriesService: TenderCategoriesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();

    this.username = this.currentUser.username;

    this.getUserById(this.currentUser.id);

    this.getTenderCategories();

    this.needRequisitionForm = this.createNeedRequisitionForm();
  }

  createNeedRequisitionForm() {
    return this.fb.group({
      address: [""],
      contacts: [""],
      manager: [""],
      department: [""],
      need: ["", [Validators.required]],
      postedBy: this.username,
      postedTime: new Date(),
      category: ["", [Validators.required]],
      despcription: ["", [Validators.required]],
      reqParticulars: new FormArray([]),
      requestDate: new Date(),
      type: ["", [Validators.required]],
    });
  }

  get f() {
    return this.needRequisitionForm.controls;
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

  getTenderCategories() {
    this.tenderCategoriesService
      .getTenderCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.categories = res;

          console.log("Categories ", this.categories);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getUserById(userId) {
    this.needRequisitionService
      .getUserDetailsById(userId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.user = res;

          console.log(this.currentUser);

          if (this.currentUser) {
            this.needRequisitionForm.patchValue({
              address: this.user.email,
              contacts: this.user.phonenumber,
              manager: this.user.username,
              department: this.user.department,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  requestNeed() {
    console.log("Inside Request Need")
    console.log("Need : ", this.needRequisitionForm.value);
    this.needRequisitionService
      .requestNeed(this.needRequisitionForm.value)
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);

          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
