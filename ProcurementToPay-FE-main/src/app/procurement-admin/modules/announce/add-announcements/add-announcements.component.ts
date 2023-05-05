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

@Component({
  selector: "app-add-announcements",
  templateUrl: "./add-announcements.component.html",
  styleUrls: ["./add-announcements.component.sass"],
})
export class AddAnnouncementsComponent implements OnInit {
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

  inputList: any[] = [{ name: "Text" }, { name: "Select" }, { name: "File" },];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private announcementService: AnnouncementService,
    private location: Location,
    private tenderService: TenderService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.username = this.user.username;

    this.Form = this.createForm();

    this.Form.patchValue({
      postedby: this.username,
    });

    this.getTenderCategories();
  }

  // {
  //   "category": "string",
  //   "categorycode": "string",
  //   "closingdate": "2022-08-26T04:23:46.372Z",
  //   "requirementsList": [
  //     {
  //       "id": 0,
  //       "inputType": "string",
  //       "label": "string",
  //       "name": "string",
  //       "type": "string",
  //       "validations": [
  //         {
  //           "id": 0,
  //           "message": "string",
  //           "name": "string",
  //           "validator": "string"
  //         }
  //       ]
  //     }
  //   ],
  //   "startdate": "2022-08-26T04:23:46.372Z",
  //   "title": "string"
  // }

  createForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required]],
      categorycode: ["", [Validators.required]],
      category: [""],
      categoryid: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      closingdate: ["", [Validators.required]],
      postedby: [""],
      requirementsList: new FormArray([]),
      bidfee: ["", [Validators.required]],
      description: ["", [Validators.required]],
      website: ["", [Validators.required]],
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
  getInputType(event: any) {
    console.log("event = ", event.value);

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
    console.log("Form: ", this.Form.value);
    this.subscription = this.announcementService
      .addAnnouncement(this.Form.value)
      .subscribe(
        (res) => {
          console.log(res);
         
            this.snackbar.showNotification(
              "snackbar-success",
              "Prequalification Requirements uploaded successfully!"
            );

          this.router.navigateByUrl('/procurement-admin/announce/pending')
        },
        (err) => {

          this.snackbar.showNotification(
            "snackbar-danger",
            err
          );
          console.log(err);
        }
      );
  }
  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }
  // upload(): void {
  //   this.announcementloading = true;
  //   this.progress = 0;
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.Form.patchValue({
  //         categoryname: this.tenderCategory.name,
  //       });
  //       const formData: any = new FormData();
  //       formData.append("jobtitle", this.Form.value.jobtitle);
  //       formData.append("categorycode", this.Form.value.categorycode);
  //       formData.append("categoryname", this.Form.value.categoryname);
  //       formData.append("categoryid", this.Form.value.categoryid);
  //       formData.append("startdate", this.Form.value.startdate);
  //       formData.append("closingdate", this.Form.value.closingdate);
  //       formData.append("username", this.Form.value.username);
  //       formData.append("documentname", this.currentFile);

  //       console.log("Form data: ", formData);

  //       this.announcementService.addAnnouncement(formData).subscribe({
  //         next: (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round((100 * event.loaded) / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             //this.message = event.body.message;
  //             this.Form.reset();
  //             this.announcementloading = false;
  //             this.snackbar.showNotification(
  //               "snackbar-success",
  //               "Prequalification Announcement uploaded successfully!"
  //             );
  //             //this.fileInfos = this.uploadInvoice.getFiles();
  //           }
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //           this.progress = 0;
  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message =
  //               "Prequalification Announcement could not be uploaded. Please check details and retry!";
  //           }
  //           this.currentFile = undefined;
  //         },
  //       });
  //     }
  //     this.selectedFiles = undefined;
  //   }
  // }

  onCancel() {
    this.router.navigate(["/procurement-admin/announce/pending"]);
  }
  back() {
    this.location.back();
  }
}
