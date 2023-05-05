import { HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TenderPreperationService } from "src/app/data/services/procurement-admin/tender-preperation.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { PreqParametersService } from "src/app/procurement-admin/data/services/preq-params.service";
import { TenderService } from "src/app/procurement-admin/data/services/tenders.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PreqCategoriesComponent } from "../../preq-categories.component";

@Component({
  selector: "app-add-cat",
  templateUrl: "./add-cat.component.html",
  styleUrls: ["./add-cat.component.sass"],
})
export class AddCatComponent implements OnInit {
  Form: FormGroup;
  dyForm: FormGroup;

  expensesList: any;
  subscription!: Subscription;
  accounts: any;
  replicateAllExpenses: string[] = ["Yes", "No"];
  //replicateAllExpensesToCostCenterSelected: boolean = true;

  currentUser: any;

  selectedExpense: any;
  selectedExpenseId: any;
  fetchedExpense: any;

  fetchedAnnouncements: any;

  inputList: any[] = [{ name: "Text" }, { name: "File" }, { name: "Select" }];
  tenders: any;
  fetchedTender: any;

  constructor(
    public dialogRef: MatDialogRef<PreqCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private preqParamService: PreqParametersService,
    public dialog: MatDialog,
    private tokenService: TokenStorageService,
    private announcementService: AnnouncementService,
    private tenderPreperationService: TenderPreperationService,
    private tenderService: TenderService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    //this.getExpenses();
    //this.getTaxAccountNos();
    this.getApprovedAnnouncements();

    this.getTenders();

    this.Form = this.createPreqParamsForm();
  }

  createPreqParamsForm(): FormGroup {
    return this.fb.group({
      categoryname: ["", [Validators.required]],
      tenderTitle: [""],
      tenderid: ["1", [Validators.required]],
      requirementsList: new FormArray([]),
    });
  }
  get f() {
    return this.Form.controls;
  }
  get t() {
    return this.f.requirementsList as FormArray;
  }

  getTenders() {
    this.tenderPreperationService.fetchApprovedTenders().subscribe(
      (result) => {
        this.tenders = result;

        console.log("Results ", result);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getInputType(event: any) {
    console.log("event = ", event.value);

    this.dyForm.patchValue({
      inputType: event.value.toLowerCase(),
      type: event.value.toLowerCase(),
    });
  }
  getRequirementName(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;
    var reqNoSpace = stringToConvert.replace(/\s/g, "").toLowerCase();
    this.dyForm.patchValue({
      label: stringToConvert,
      name: reqNoSpace,
    });
  }

  onAddField() {
    //console.log("dyForm: ", this.dyForm.value.inputtype)
    this.t.push(
      (this.dyForm = this.fb.group({
        inputtype: [""],
        requirementname: [""],
        inputType: [""],
        label: [""],
        name: [""],
        type: [""],
        validations: [
          [
            {
              name: "required",
              validator: "required",
              message: "This field is Required",
            },
          ],
        ],
      }))
    );
  }
  onRemoveField(i: any) {
    if (i > 0) {
      this.t.removeAt(i);
    }
  }

  getTenderById(event: any) {
    const params = new HttpParams().set("id", event.value);
    this.tenderService.getTenderById(params).subscribe(
      (res) => {
        console.log("Announcements: ", res);

        this.fetchedTender = res;
        this.Form.patchValue({
          tenderTitle: this.fetchedTender.title,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  getApprovedAnnouncements() {
    this.announcementService.getApprovedAnnouncements().subscribe(
      (res) => {
        console.log("Announcements: ", res);

        this.fetchedAnnouncements = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addPreqParams() {
    console.log("Preq Form: ", this.Form.value);
    this.preqParamService.addPreqParameter(this.Form.value).subscribe(
      (res) => {
        this.snackbar.showNotification(
          "snackbar-success",
          "Prequalification Parameters added successfully !"
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
