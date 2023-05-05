import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account/data/services/account.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddUserToCommitteComponent } from '../../add-user-to-committe/add-user-to-committe.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  member: any;
  memberId: number;

  constructor(
    public dialogRef: MatDialogRef<AddUserToCommitteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.member = this.data.data;
    console.log(this.member);
  }

}
