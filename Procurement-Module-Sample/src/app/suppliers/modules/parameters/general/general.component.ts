import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { SupplierParamsService } from "src/app/suppliers/data/services/supplier-parameters.service";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.sass"],
})
export class GeneralComponent implements OnInit {
  Form!: FormGroup;
  subscription!: Subscription;

  data: any;
  isLoading: boolean = true;
  paramsExist: boolean = false;

  currentUser: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  fileInfos?: Observable<any>;
  announcementloading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private paramsService: SupplierParamsService,
    private tokenService: TokenStorageService,
  ) {

  }
  ngOnInit(): void {

    //throw new Error("Method not implemented.");

    this.currentUser = this.tokenService.getUser();

    this.getData(this.currentUser.id);
    this.initForm();
  }

  getData(supplierId) {
    this.subscription = this.paramsService
      .getOrganisationPramsById(supplierId)
      .subscribe((res) => {
        this.data = res[0];
        console.log("this.data = ", this.data);

        if (this.data) {
          this.isLoading = false;
        }
        if (this.data) {
          this.initForm();
          this.paramsExist = true;
          this.Form.patchValue({
            id: this.data.id,
            supplierid: this.data.supplierid,
            companyname: this.data.companyname,
            emailaddress: this.data.emailaddress,
            phoneno: this.data.phoneno,
            //address: this.data.address,
            website: this.data.website,
            physicaladdress: this.data.physicaladdress,
            country: 'Kenya',
            logo: this.data.logo,

          });
          console.log("this.Form = ", this.Form.value);

        }
      });
  }

  initForm() {
    this.Form = this.fb.group({
      id: [""],
      supplierid: [""],
      companyname: [
        "",
        [Validators.required],
      ],
      emailaddress: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      phoneno: [
        "",
        [
          Validators.required,

        ],
      ],
      website: [""],
      logo: [""],
      physicaladdress: ["", [Validators.required]],
      country: ["", [Validators.required]],
      // website: ["", [Validators.required]],
    });
  }



  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  uploadAdd(): void {
    this.announcementloading = true;
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        const formData: any = new FormData();
        //formData.append('id', this.Form.value.id);
        formData.append('supplierid', this.Form.value.supplierid);
        formData.append('companyname', this.Form.value.companyname);
        formData.append('emailaddress', this.Form.value.emailaddress);
        formData.append('phoneno', this.Form.value.phoneno);
        formData.append('website', this.Form.value.website);
        formData.append('physicaladdress', this.Form.value.physicaladdress);
        formData.append('country', this.Form.value.country);
        formData.append('logo', this.currentFile);

        this.paramsService
          .addOrganisationPrams(formData).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                //this.message = event.body.message;
                this.Form.reset();
                this.announcementloading = false;
                this.snackbar.showNotification(
                  "snackbar-success",
                  "Parameters uploaded successfully!"
                );
                //this.fileInfos = this.uploadInvoice.getFiles();
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = "Parameters could not be uploaded. Please check details and retry!";
              }
              this.currentFile = undefined;
            },
          });
      }
      this.selectedFiles = undefined;
    }
  }


  onFormSubmit() {
    console.log("this.currentUser = ", this.currentUser)
    this.Form.patchValue({
      supplierid: this.currentUser.id
    })
    console.log("Form Value", this.Form.value);

    if (this.paramsExist) {
      this.paramsService
        .updateOrganisationPrams(this.Form.value)
        .pipe()
        .subscribe(
          (res) => {
            console.log("Response = ", res);
            this.snackbar.showNotification(
              "snackbar-success",
              "Parameters updated successfully!"
            );
          },
          (err) => {
            console.log("Error ", err);
            this.snackbar.showNotification(
              "snackbar-danger",
              "Parameters update failure!"
            );
          }
        );

    } else if (!this.paramsExist) {
      this.uploadAdd();
    }

  }
}
