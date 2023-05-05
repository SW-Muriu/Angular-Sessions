import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription, } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Location } from "@angular/common";
import { TenderRequirementsService } from "src/app/procurement-admin/data/services/tender-requirements.service";
import { MandatoryRequirementsComponent } from "../../mandatory-requirements/mandatory-requirements.component";

@Component({
  selector: 'app-edit-tender-requirement',
  templateUrl: './edit-tender-requirement.component.html',
  styleUrls: ['./edit-tender-requirement.component.sass']
})
export class EditTenderRequirementComponent implements OnInit {

  Form: FormGroup;
  username: string;
  user: any;

  announcementloading: boolean = false;

  subscription!: Subscription;
  tenderCategories: any;
  tenderCategory: any;
  data: any;
  reqData: any;

  inputTypes: any[] = [{ name: "Text" }, { name: "Select" }, { name: "File" }];
  categories: any[] = [{ name: "Mandatory" }, { name: "Financial" }, { name: "Technical" }];
  dialogTitle: string;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private location: Location,
    private tenderRequirementsService: TenderRequirementsService,
    public dialogRef: MatDialogRef<MandatoryRequirementsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data.data;
    this.reqData = data.selected;
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.username = this.user.username;


    this.Form = this.createForm();
    console.log("data: ", this.data)
    this.Form.patchValue({
      postedby: this.username,
      category: this.data
    });

    this.dialogTitle = "Add tender requirement";

  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.reqData.id],
      category: [this.reqData.category, [Validators.required]],
      inputType: [this.reqData.inputType, [Validators.required]],
      label: [this.reqData.label, [Validators.required]],
      name: [this.reqData.name],
      type: [this.reqData.type],
      validations: [this.reqData.validations],
    });
  }

  getCategory(event: any) {

  }

  getInputType(event: any) {
    console.log("event = ", event.value);

    this.Form.patchValue({
      //inputType: event.value,
      type: event.value.toLowerCase(),
    });
  }
  getRequirementName(event: Event) {
    var stringToConvert = (event.target as HTMLInputElement).value;
    var reqNoSpace = stringToConvert.replace(/\s/g, "").toLowerCase();
    this.Form.patchValue({
      //label: stringToConvert,
      name: reqNoSpace,
    });
  }

  onSubmit() {
    console.log("Form: ", this.Form.value);
    this.subscription = this.tenderRequirementsService
      .addRequirement(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);

          this.snackbar.showNotification(
            "snackbar-success",
            "Requirement uploaded successfully!"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }


  back() {
    this.location.back();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void { }
}
