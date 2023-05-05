import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable, Subscription, takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { AnnouncementService } from "src/app/procurement-admin/data/services/anouncement.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

import {
  HttpEventType,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Location } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { TenderService } from "src/app/procurement-admin/data/services/tenders.service";
import { LocalStorageService } from "src/app/admin/data/services/localstorage.service";

@Component({
  selector: "app-update-announcement",
  templateUrl: "./update-announcement.component.html",
  styleUrls: ["./update-announcement.component.sass"],
})
export class UpdateAnnouncementComponent implements OnInit {
  Form: FormGroup;
  dyForm: FormGroup;

  types: string[] = ["Goods", "Services"];
  username: string;
  user: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  fileInfos?: Observable<any>;
  announcementloading: boolean = false;

  subscription!: Subscription;
  tenderCategories: any;
  tenderCategory: any;

  categoryId: number;
  routeState: any;
  announcement: any;
  requirementsList: any[] = [];

  inputList: any[] = [{ name: "Text" }, { name: "Select" }, { name: "File" }];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private announcementService: AnnouncementService,
    private location: Location,
    private tenderService: TenderService,
    private localStorageService: LocalStorageService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState.action == "Job details") {
        this.announcement = this.routeState.jobDetails
          ? JSON.parse(this.routeState.jobDetails)
          : "";

        this.localStorageService.set("selectedAnnouncement", this.announcement);
      } else {
        this.routeState = "";
      }
    }
  }

  ngOnInit(): void {
    this.announcement = this.localStorageService.get("selectedAnnouncement");
    this.user = this.tokenStorage.getUser();

    this.username = this.user.username;

    this.getTenderCategories();
    this.Form = this.createForm();
    this.onInitDynamicForm();
    //this.getCategoriesById(this.announcement.categoryid);

    console.log("this.Form: ", this.Form.value)
  }

 
  createForm(): FormGroup {
    return this.fb.group({
      id: [this.announcement.id],
      referenceid: [this.announcement.referenceid],
      posteddate:[this.announcement.posteddate],
      title: [this.announcement.title, [Validators.required]],
      categorycode: [this.announcement.categorycode, [Validators.required]],
      category: [this.announcement.category],
      categoryid: [this.announcement.categoryid, [Validators.required]],
      startdate: [this.announcement.startdate, [Validators.required]],
      closingdate: [this.announcement.closingdate, [Validators.required]],
      postedby: [this.announcement.postedby],
      modifiedprepostby: [""],
      requirementsList: new FormArray([]),
      bidfee: [this.announcement.bidfee, [Validators.required]],
      description: [this.announcement.description, [Validators.required]],
      website: [this.announcement.website, [Validators.required]],
    });
  }
  get f() {
    return this.Form.controls;
  }
  get t() {
    return this.f.requirementsList as FormArray;
  }
  getTenderCategories() {
    this.subscription = this.tenderService.getTenders().subscribe((res) => {
      this.tenderCategories = res;
    });
  }
  onAddField() {
    this.t.push(
      (this.dyForm = this.fb.group({
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
    this.t.removeAt(i);
  }

  onInitDynamicForm() {
    this.requirementsList = this.announcement.requirementsList;
    for (let i = 0; i < this.requirementsList.length; i++) {
      this.onAddFeedField(this.requirementsList[i]);
    }
  }

  onAddFeedField(i: any) {
    let expId = Number(i.expenseId);
    this.t.push(
      (this.dyForm = this.fb.group({
        id: [i.id],
        inputType: [i.inputType],
        label: [i.label],
        name: [i.name],
        type: [i.type],
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
    console.log("dyForm: ", this.dyForm.value);
  }

  getInputType(event: any) {
    this.dyForm.patchValue({
      inputType: event.value,
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

  convertEvent(event: any) {
    event.value = this.categoryId;
    this.getCategoryById(this.categoryId)
  }

  getCategoryById(categoryId) {
    this.subscription = this.announcementService
      .getTenderCategoryById(categoryId)
      .subscribe((res) => {
        this.tenderCategory = res;
        this.Form.patchValue({
          //categoryid: this.tenderCategory.categoryid,
          category: this.tenderCategory.name,
          categorycode: this.tenderCategory.code,
        });
      });
  }
  getAnnouncements(event: any) {
    console.log("event", event.value);
    this.subscription = this.announcementService
      .getTenderCategoryById(event.value)
      .subscribe((res) => {
        this.tenderCategory = res;
        this.Form.patchValue({
          category: this.tenderCategory.name,
          categorycode: this.tenderCategory.code,
        });
      });
  }


  onSubmit() {
    this.Form.patchValue({
      modifiedprepostby: this.username,
    });
    console.log("Updated Form: ", this.Form.value);
    this.subscription = this.announcementService
      .updateAnnouncement(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Prequalification Requirements updated successfully!"
          );

          this.router.navigateByUrl("/procurement-admin/announce/pending");
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.router.navigate(["/procurement-admin/announce/pending"]);
  }
  back() {
    this.location.back();
  }
}
