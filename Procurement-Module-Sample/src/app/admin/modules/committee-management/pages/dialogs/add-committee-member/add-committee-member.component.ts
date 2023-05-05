import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommitteeService } from 'src/app/data/services/admin/committee.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { takeUntil } from 'rxjs';
import { AddUserToCommitteComponent } from '../../add-user-to-committe/add-user-to-committe.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-committee-member',
  templateUrl: './add-committee-member.component.html',
  styleUrls: ['./add-committee-member.component.sass']
})
export class AddCommitteeMemberComponent extends BaseComponent implements OnInit {
  member: any;
  memberId: number;
  addMemberToCommitteeForm: FormGroup;
  roles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUserToCommitteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private committeeService: CommitteeService,
    private snackbar: SnackbarService
  ) {
    super()
   }

  ngOnInit(): void {

    console.log(this.data)
    this.member = this.data.data;

    this.memberId = this.data.data.id;

    this.getCommitteeMemberRoles();

    this.addMemberToCommitteeForm = this.createAddMemberToCommitteeForm();

    this.addMemberToCommitteeForm.patchValue({
      userid: this.member.id, 
    });

    console.log("Meber Form", this.addMemberToCommitteeForm.value)
  }

  createAddMemberToCommitteeForm(){
    return this.fb.group({
      roleid: ['', [Validators.required]],
      userid: ['', [Validators.required]]
    })
  }

  addMemberToCommittee(){
    console.log("Member Details", {roleid: this.member.id, userid: this.member.roles[0].id })
    this.committeeService.addMemberToCommittee(this.addMemberToCommitteeForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification("snackbar-success", "User added to committee successfully!");
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCommitteeMemberRoles(){
    console.log("Member Details", {roleid: this.member.id, userid: this.member.roles[0].id })
    this.committeeService.getAllCommitteeRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          this.roles = res

          console.log(res)

        },
        (err) => {
          console.log(err);
        }
      );
  }

  onClick(){
    this.dialogRef.close()
  }

}
