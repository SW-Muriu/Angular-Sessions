import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { CommitteeService } from 'src/app/data/services/admin/committee.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddUserToCommitteComponent } from '../../add-user-to-committe/add-user-to-committe.component';

@Component({
  selector: 'app-remove-member-from-committee',
  templateUrl: './remove-member-from-committee.component.html',
  styleUrls: ['./remove-member-from-committee.component.sass']
})
export class RemoveMemberFromCommitteeComponent extends BaseComponent implements OnInit {
  member: any;
  memberId: number;

  constructor(
    public dialogRef: MatDialogRef<AddUserToCommitteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private committeeService: CommitteeService,
    private snackbar: SnackbarService
  ) {
    super()
   }

  ngOnInit(): void {

    console.log(this.data)
    this.member = this.data.data;

    this.memberId = this.data.data.id;
  }

  removeMemberFromCommittee(){
    console.log("Member Details", {roleid: this.member.id, userid: this.member.roles[0].id })
    this.committeeService.removeMemberFromCommittee(this.member.id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification("snackbar-success", "User removed from committee successfully!");
          this.dialogRef.close();
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
