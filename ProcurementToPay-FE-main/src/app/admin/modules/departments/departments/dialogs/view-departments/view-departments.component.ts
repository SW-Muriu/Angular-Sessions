import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentsService } from 'src/app/admin/data/services/departments.service';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DepartmentsComponent } from '../../departments.component';


@Component({
  selector: 'app-view-departments',
  templateUrl: './view-departments.component.html',
  styleUrls: ['./view-departments.component.sass']
})
export class ViewDepartmentsComponent implements OnInit {

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
    
  ]);
  

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Edit Department";

    // this.Form = this.fb.group({
    //   title: [this.Data.title],
    //   body: [this.Data.body],
      
    // })
  }
  createForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id],
      name: [this.Data.name, Validators.required],
      
    });
  }

  onSubmit() {
    this.deptService
      .updateDepartment(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
      
            this.dialogRef.close();
            this.snackbar.showNotification('snackbar-success', 'Department updated successfully!')
          
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', err)
        }
      );
  }

  
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
}