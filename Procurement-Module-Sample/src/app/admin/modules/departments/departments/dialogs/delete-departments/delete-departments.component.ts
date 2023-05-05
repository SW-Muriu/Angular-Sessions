import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { DepartmentsService } from 'src/app/admin/data/services/departments.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Component({
  selector: 'app-delete-departments',
  templateUrl: './delete-departments.component.html',
  styleUrls: ['./delete-departments.component.sass']
})
export class DeleteDepartmentsComponent implements OnInit {

  sender: any;
  senderId: number;
  constructor(
    public dialogRef: MatDialogRef<DeleteDepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deptService: DepartmentsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.sender = this.data.sender;
    console.log("Sender = ", this.sender);
    this.senderId = this.sender.id
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log(this.senderId);
    this.deptService
      .deleteDepartment(this.senderId)
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'Department deleted successfully!')
          //window.location.reload();
          this.dialogRef.close();
          console.log(res);
          
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-success', err)
        }
      );
  }

  
}