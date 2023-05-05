import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesComponent } from "../roles/roles.component";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.sass"],
})
export class AddRoleComponent implements OnInit {
  addRoleForm: FormGroup;

  accessRights: string[] = [
    "Set Bank Parameters",
    "Edit Bank Parameters",
    "View Bank PArameters",
    "Add Customer Configurations",
    "Edit Customer Configurations",
    "View Customer Configurations",
    "Add General Email Templates",
    "Edit General Email Templates",
    "View General Email Templates",
    "View Sent General Emails",
    "Compose Single Email",
    "Add Multi-Email Senders",
    "Create Multi-Email Templates",
    "View Multi-Email Templates",
    "View Multi-Email Sent History",
    "Compose Multi-Emails",
    "Add SMS Profile Codes",
    "Create SMS Templates",
    "View SMS Templates",
    "View SMS History",
    "View Account Settings",
  ];
  
  constructor( public dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}


  ngOnInit(): void {
    this.addRoleForm = this.fb.group({
      role: ["", [Validators.required]],
      accessRights: ["", [Validators.required]],
    })
  }

  onClick(){
    this.dialogRef.close();
  }
}
