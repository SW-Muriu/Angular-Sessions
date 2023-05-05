import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DepartmentsService } from "src/app/admin/data/services/departments.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepartmentsComponent } from "../../departments.component";


@Component({
  selector: 'app-create-departments',
  templateUrl: './create-departments.component.html',
  styleUrls: ['./create-departments.component.sass']
})
export class CreateDepartmentsComponent implements OnInit {

  isSuccessful = false;
  isUploadFailed = false;
  errorMessage = "";

  action: string;
  dialogTitle: string;
  //employeesForm: FormGroup;
  sender: any;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  //categorys = [{ name: "Company" }, { name: "Individual" }];

  selectFeedback: " ";

  constructor(
    private deptService: DepartmentsService,
    private fb: FormBuilder, private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<DepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    //console.log("The data = " + this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Add Departments";
  }

  submit() {
    console.log("Form contents = ", this.Form.value);
    this.deptService
      .addDepartment(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log("Response = ",res);
    
            this.dialogRef.close();
            this.snackbar.showNotification('snackbar-success', 'Department added successfully!')
          
        },
        (err) => {
          console.log("Error ", err);
          this.snackbar.showNotification('snackbar-danger', 'Department upload failure!')
        }
      );
  }

 
  createForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
    });
  }

 
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
}
