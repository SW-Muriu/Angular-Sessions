import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription, } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Location } from "@angular/common";
import { TenderRequirementsService } from "src/app/procurement-admin/data/services/tender-requirements.service";
import { MandatoryRequirementsComponent } from "../../mandatory-requirements/mandatory-requirements.component";
@Component({
  selector: "app-add-tender-requirement",
  templateUrl: "./add-tender-requirement.component.html",
  styleUrls: ["./add-tender-requirement.component.sass"],
})
export class AddTenderRequirementComponent implements OnInit {
  Form: FormGroup;
  username: string;
  user: any;

  announcementloading: boolean = false;

  subscription!: Subscription;
  tenderCategories: any;
  tenderCategory: any;
  data: any;

  inputTypes: any[] = [{ name: "Text" }, { name: "Select" }, { name: "File" }];
  categories: any[] = [{ name: "Mandatory" }, { name: "Financial" }, { name: "Technical" }];
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private location: Location,
    private tenderRequirementsService: TenderRequirementsService,
    public dialogRef: MatDialogRef<MandatoryRequirementsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data.data;
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
      category: ["", [Validators.required]],
      inputType: ["", [Validators.required]],
      label: ["",[Validators.required]],
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
